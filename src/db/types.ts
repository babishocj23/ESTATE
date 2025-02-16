export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'agent' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'agent' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          location: string
          type: 'sale' | 'rent'
          beds: number | null
          baths: number | null
          sqft: number | null
          image: string | null
          status: 'active' | 'under_contract' | 'sold' | 'inactive'
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          location: string
          type: 'sale' | 'rent'
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          image?: string | null
          status?: 'active' | 'under_contract' | 'sold' | 'inactive'
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          type?: 'sale' | 'rent'
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          image?: string | null
          status?: 'active' | 'under_contract' | 'sold' | 'inactive'
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
      agent_stats: {
        Row: {
          id: string
          agent_id: string
          total_leads: number
          active_listings: number
          revenue: number
          conversion_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          total_leads?: number
          active_listings?: number
          revenue?: number
          conversion_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          total_leads?: number
          active_listings?: number
          revenue?: number
          conversion_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      agent_activities: {
        Row: {
          id: string
          agent_id: string
          activity_type: string
          message: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          activity_type: string
          message: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          activity_type?: string
          message?: string
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 