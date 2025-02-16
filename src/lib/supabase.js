import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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

// Favorites functions
export const toggleFavorite = async (userId, propertyId) => {
  const { data: existing, error: fetchError } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('property_id', propertyId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') return { error: fetchError }

  if (existing) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)
    return { data: null, error }
  } else {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, property_id: propertyId }])
      .select()
    return { data, error }
  }
}

export const getUserFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      property_id,
      properties (*)
    `)
    .eq('user_id', userId)
  return { data, error }
} 