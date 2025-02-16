import { useState, useEffect } from 'react';
import { FiUsers, FiDollarSign, FiHome, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-dark-800 rounded-xl p-6 hover:bg-dark-700 transition-colors">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
      </div>
      <div className="p-3 bg-dark-900/50 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        {trend.direction === 'up' ? (
          <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <FiTrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend.value}%
        </span>
        <span className="text-gray-400 text-sm ml-1">vs last month</span>
      </div>
    )}
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-3 py-3">
    <div className="p-2 bg-dark-800 rounded-lg">
      <activity.icon className="w-4 h-4 text-primary" />
    </div>
    <div>
      <p className="text-sm text-white">{activity.message}</p>
      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
    </div>
  </div>
);

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch agent stats
        const { data: agentStats, error: statsError } = await supabase
          .from('agent_stats')
          .select('*')
          .eq('agent_id', user.id)
          .single();

        if (statsError) throw statsError;

        // Fetch recent activities
        const { data: recentActivities, error: activitiesError } = await supabase
          .from('agent_activities')
          .select('*')
          .eq('agent_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (activitiesError) throw activitiesError;

        setStats(agentStats);
        setActivities(recentActivities || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-dark-800 rounded-xl">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Agent'}
          <span className="text-primary">.</span>
        </h2>
        <p className="text-gray-400">Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={stats?.total_leads || 0}
          icon={FiUsers}
          trend={{ direction: 'up', value: 12 }}
        />
        <StatCard
          title="Revenue"
          value={`$${(stats?.revenue || 0).toLocaleString()}`}
          icon={FiDollarSign}
          trend={{ direction: 'up', value: 8 }}
        />
        <StatCard
          title="Active Listings"
          value={stats?.active_listings || 0}
          icon={FiHome}
          trend={{ direction: 'down', value: 3 }}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats?.conversion_rate || 0}%`}
          icon={FiTrendingUp}
          trend={{ direction: 'up', value: 2 }}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="divide-y divide-dark-700">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <p className="text-gray-400 py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 