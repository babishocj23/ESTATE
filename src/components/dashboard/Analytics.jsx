import React, { useState, useEffect } from 'react';
import { FiLoader, FiUsers, FiDollarSign, FiTrendingUp, FiEye } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLeads: 0,
    totalSales: 0,
    totalRevenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get agent stats
      const { data: agentStats, error: statsError } = await supabase
        .from('agent_stats')
        .select('*')
        .eq('agent_id', user?.id)
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      // If no stats exist, create initial stats
      if (!agentStats) {
        const { data: newStats, error: createError } = await supabase
          .from('agent_stats')
          .insert([{
            agent_id: user?.id,
            total_views: 0,
            total_leads: 0,
            total_sales: 0,
            total_revenue: 0
          }])
          .select()
          .single();

        if (createError) throw createError;
        
        setStats({
          totalViews: 0,
          totalLeads: 0,
          totalSales: 0,
          totalRevenue: 0,
          conversionRate: 0
        });
      } else {
        // Calculate conversion rate
        const conversionRate = agentStats.total_leads > 0
          ? ((agentStats.total_sales / agentStats.total_leads) * 100).toFixed(1)
          : 0;

        setStats({
          totalViews: agentStats.total_views,
          totalLeads: agentStats.total_leads,
          totalSales: agentStats.total_sales,
          totalRevenue: agentStats.total_revenue,
          conversionRate
        });
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-dark-700 rounded-lg">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Performance Overview<span className="text-primary">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Views */}
        <div className="bg-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <FiEye className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-gray-400">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>

        {/* Total Leads */}
        <div className="bg-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <FiUsers className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-gray-400">Total Leads</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalLeads.toLocaleString()}
          </p>
        </div>

        {/* Total Sales */}
        <div className="bg-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm text-gray-400">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalSales.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {stats.conversionRate}% conversion rate
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-sm text-gray-400">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Additional analytics sections like charts and trends would go here */}
    </div>
  );
};

export default Analytics;