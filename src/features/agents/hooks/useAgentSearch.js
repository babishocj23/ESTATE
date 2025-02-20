import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_AGENT_FILTERS } from '../constants/filterOptions';
import { supabase } from '../../../config/supabaseClient';

export const useAgentSearch = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_AGENT_FILTERS);
  const [totalAgents, setTotalAgents] = useState(0);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_AGENT_FILTERS);
  }, []);

  // Update individual filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Search agents based on filters
  const searchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('agents')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.name) {
        query = query.ilike('fullName', `%${filters.name}%`);
      }
      
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.specialty) {
        query = query.contains('specialties', [filters.specialty]);
      }
      
      if (filters.experience) {
        const [min, max] = filters.experience.split('-');
        if (max === '+') {
          query = query.gte('experienceYears', parseInt(min));
        } else {
          query = query.and(`experienceYears.gte.${min},experienceYears.lte.${max}`);
        }
      }
      
      if (filters.rating) {
        query = query.gte('rating', parseFloat(filters.rating));
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setAgents(data || []);
      setTotalAgents(count || 0);
    } catch (err) {
      setError(err.message);
      console.error('Error searching agents:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Trigger search when filters change
  useEffect(() => {
    searchAgents();
  }, [searchAgents]);

  return {
    agents,
    loading,
    error,
    filters,
    totalAgents,
    updateFilter,
    resetFilters,
    searchAgents
  };
}; 