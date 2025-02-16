import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper functions for agent dashboard
export const getAgentStats = async (agentId: string) => {
  const { data, error } = await supabase
    .from('agent_stats')
    .select('*')
    .eq('agent_id', agentId)
    .single();

  if (error) throw error;
  return data;
};

export const getAgentActivities = async (agentId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('agent_activities')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

export const updateAgentStats = async (agentId: string, stats: Partial<Database['public']['Tables']['agent_stats']['Update']>) => {
  const { data, error } = await supabase
    .from('agent_stats')
    .update(stats)
    .eq('agent_id', agentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const logAgentActivity = async (
  agentId: string,
  activityType: string,
  message: string,
  metadata?: Record<string, any>
) => {
  const { error } = await supabase
    .from('agent_activities')
    .insert({
      agent_id: agentId,
      activity_type: activityType,
      message,
      metadata
    });

  if (error) throw error;
}; 