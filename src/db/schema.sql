-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('user', 'agent', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    location TEXT NOT NULL,
    type TEXT CHECK (type IN ('sale', 'rent')) NOT NULL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    image TEXT,
    status TEXT CHECK (status IN ('active', 'under_contract', 'sold', 'inactive')) DEFAULT 'active',
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, property_id)
);

CREATE TABLE IF NOT EXISTS public.agent_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    total_leads INTEGER DEFAULT 0,
    active_listings INTEGER DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(agent_id)
);

CREATE TABLE IF NOT EXISTS public.agent_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Properties are viewable by everyone"
    ON public.properties FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create properties"
    ON public.properties FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own properties"
    ON public.properties FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own properties"
    ON public.properties FOR DELETE
    USING (auth.uid() = owner_id);

CREATE POLICY "Favorites are viewable by owner"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create favorites"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Agent stats are viewable by owner"
    ON public.agent_stats FOR SELECT
    USING (auth.uid() = agent_id);

CREATE POLICY "Agent activities are viewable by owner"
    ON public.agent_activities FOR SELECT
    USING (auth.uid() = agent_id);

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  
  -- If user is an agent, create stats record
  IF COALESCE(new.raw_user_meta_data->>'role', 'user') = 'agent' THEN
    INSERT INTO public.agent_stats (agent_id)
    VALUES (new.id);
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_stats_updated_at
    BEFORE UPDATE ON public.agent_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.properties (title, description, price, location, type, beds, baths, sqft, image, status, owner_id)
VALUES 
('Modern Downtown Condo', 'Luxurious 2-bedroom condo with stunning city views', 450000, 'Downtown', 'sale', 2, 2, 1200, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'active', (SELECT id FROM public.profiles WHERE role = 'agent' LIMIT 1)),
('Cozy Studio Apartment', 'Perfect for young professionals', 1500, 'Midtown', 'rent', 0, 1, 500, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', 'active', (SELECT id FROM public.profiles WHERE role = 'agent' LIMIT 1)),
('Family Home with Garden', 'Spacious 4-bedroom house with large backyard', 750000, 'Suburbs', 'sale', 4, 3, 2500, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 'active', (SELECT id FROM public.profiles WHERE role = 'agent' LIMIT 1))
ON CONFLICT DO NOTHING; 