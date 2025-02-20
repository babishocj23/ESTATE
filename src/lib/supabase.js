import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public'
  }
})

// Auth functions
export const signUp = async ({ email, password, ...metadata }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
}

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Properties functions
export const getProperties = async (filters = {}) => {
  let query = supabase
    .from('properties')
    .select(`
      *,
      owner:owner_id(*)
    `)
  
  if (filters.type) query = query.eq('type', filters.type)
  if (filters.minPrice) query = query.gte('price', filters.minPrice)
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice)
  if (filters.location) query = query.ilike('location', `%${filters.location}%`)
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const getPropertyById = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      owner:owner_id(*)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

// Add the agents functions after the properties functions
export const getAgents = async (filters = {}) => {
  let query = supabase
    .from('agents')
    .select('*')
  
  if (filters.location) query = query.ilike('location', `%${filters.location}%`)
  if (filters.specialty) query = query.contains('specialties', [filters.specialty])
  
  const { data, error } = await query
  return { data, error }
}

export const getAgentById = async (id) => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

// Favorites functions
export const toggleFavorite = async (userId, propertyId) => {
  try {
    // First try to find if this is a mock property
    const allMockProperties = [
      ...properties,
      ...bestOffers,
      ...rentProperties,
      ...rentSpecialOffers
    ];
    const isMockProperty = allMockProperties.some(p => p.id === propertyId);

    // If it's a mock property, store favorites in localStorage
    if (isMockProperty) {
      const storageKey = `user_favorites_${userId}`;
      const storedFavorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      if (storedFavorites.includes(propertyId)) {
        // Remove from favorites
        const updatedFavorites = storedFavorites.filter(id => id !== propertyId);
        localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
        return { data: null, error: null };
      } else {
        // Add to favorites
        storedFavorites.push(propertyId);
        localStorage.setItem(storageKey, JSON.stringify(storedFavorites));
        return { data: { property_id: propertyId }, error: null };
      }
    }

    // If not a mock property, proceed with database operation
    const { data: existing, error: fetchError } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') return { error: fetchError };

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);
      return { data: null, error };
    } else {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, property_id: propertyId }])
        .select();
      return { data, error };
    }
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    return { error };
  }
};

export const getUserFavorites = async (userId) => {
  try {
    // Get favorites from localStorage
    const storageKey = `user_favorites_${userId}`;
    const storedFavorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Get favorites from database
    const { data: dbFavorites, error } = await supabase
      .from('favorites')
      .select(`
        property_id,
        properties (*)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching database favorites:', error);
      // Return only local favorites if database fetch fails
      return { 
        data: storedFavorites.map(id => ({ property_id: id })),
        error: null 
      };
    }

    // Combine database and local favorites
    const allFavorites = [
      ...(dbFavorites || []),
      ...storedFavorites.map(id => ({ property_id: id }))
    ];

    return { data: allFavorites, error: null };
  } catch (error) {
    console.error('Error in getUserFavorites:', error);
    return { error };
  }
};

// Mock data
export const properties = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Woodland Apartment',
    price: 340000,
    location: '1012 Ocean avenue, New york, USA',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    rating: 4.9,
    type: 'buy',
    propertyType: 'apartment',
    sqft: 1225,
    beds: 3,
    baths: 2,
    coordinates: '40.7128,-74.0060', // New York coordinates
  },
  // ... other properties
];

export const bestOffers = [
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    title: 'Downtown Loft',
    price: 275000,
    originalPrice: 320000,
    location: 'Financial District, New York, USA',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    rating: 4.7,
    type: 'buy',
    propertyType: 'loft',
    sqft: 950,
    beds: 1,
    baths: 1,
    discount: 45000,
  },
  // ... other best offers
];

export const rentProperties = [
  {
    id: '123e4567-e89b-12d3-a456-426614174005',
    title: 'Modern Studio',
    price: 2500,
    location: 'Downtown, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    rating: 4.5,
    type: 'rent',
    propertyType: 'apartment',
    sqft: 650,
    beds: 1,
    baths: 1,
    coordinates: '34.0522,-118.2437', // Los Angeles coordinates
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    title: 'Luxury Condo',
    price: 3500,
    location: 'Beverly Hills, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    rating: 4.8,
    type: 'rent',
    propertyType: 'condo',
    sqft: 950,
    beds: 2,
    baths: 2,
    coordinates: '34.0736,-118.4004', // Beverly Hills coordinates
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174007',
    title: 'Beach House',
    price: 4500,
    location: 'Santa Monica, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
    rating: 4.7,
    type: 'rent',
    propertyType: 'house',
    sqft: 1800,
    beds: 3,
    baths: 2,
    coordinates: '34.0195,-118.4912', // Santa Monica coordinates
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    title: 'Hollywood Hills Villa',
    price: 7500,
    location: 'Hollywood Hills, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    rating: 4.9,
    type: 'rent',
    propertyType: 'villa',
    sqft: 2200,
    beds: 3,
    baths: 3,
    coordinates: '34.1184,-118.3004', // Hollywood Hills coordinates
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174009',
    title: 'Venice Beach Apartment',
    price: 5200,
    location: 'Venice Beach, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7',
    rating: 4.6,
    type: 'rent',
    propertyType: 'apartment',
    sqft: 1400,
    beds: 2,
    baths: 2,
    coordinates: '33.9850,-118.4695', // Venice Beach coordinates
  },
];

export const rentSpecialOffers = [
  {
    id: '123e4567-e89b-12d3-a456-426614174010',
    title: 'Studio with View',
    price: 2200,
    originalPrice: 2800,
    location: 'Financial District, New York, USA',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9',
    rating: 4.6,
    type: 'rent',
    propertyType: 'studio',
    sqft: 550,
    beds: 1,
    baths: 1,
    discount: 600,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    title: 'Luxury Penthouse',
    price: 8500,
    originalPrice: 10000,
    location: 'Downtown LA, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    rating: 4.9,
    type: 'rent',
    propertyType: 'penthouse',
    sqft: 2800,
    beds: 4,
    baths: 3.5,
    discount: 1500,
    coordinates: '34.0407,-118.2468',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174013',
    title: 'Modern Loft',
    price: 3800,
    originalPrice: 4500,
    location: 'Arts District, Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    rating: 4.7,
    type: 'rent',
    propertyType: 'loft',
    sqft: 1200,
    beds: 2,
    baths: 2,
    discount: 700,
    coordinates: '34.0403,-118.2351',
  }
]; 