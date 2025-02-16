import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBarChart2, FiShoppingBag, FiUsers, 
  FiStar, FiMessageSquare, FiTrello, FiSettings,
  FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

// Import dashboard components
import PropertyHub from '../components/dashboard/PropertyHub';
import Analytics from '../components/dashboard/Analytics';
import ShopManager from '../components/dashboard/ShopManager';
import LeadManager from '../components/dashboard/LeadManager';
import Reviews from '../components/dashboard/Reviews';
import Communications from '../components/dashboard/Communications';
import Marketing from '../components/dashboard/Marketing';

const AgentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAgentRole = async () => {
      try {
        setLoading(true);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user?.id)
          .single();

        if (error) throw error;

        if (profile?.role !== 'agent') {
          navigate('/dashboard');
          return;
        }
      } catch (err) {
        console.error('Error checking agent role:', err);
        setError('Failed to verify agent status');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      checkAgentRole();
    }
  }, [user, navigate]);

  const navigationItems = [
    { id: 'properties', label: 'Properties', icon: FiHome, component: PropertyHub },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2, component: Analytics },
    { id: 'shop', label: 'My Shop', icon: FiShoppingBag, component: ShopManager },
    { id: 'leads', label: 'Leads', icon: FiUsers, component: LeadManager },
    { id: 'reviews', label: 'Reviews', icon: FiStar, component: Reviews },
    { id: 'communications', label: 'Communications', icon: FiMessageSquare, component: Communications },
    { id: 'marketing', label: 'Marketing', icon: FiTrello, component: Marketing },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="bg-dark-800 p-6 rounded-lg text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Dashboard Header */}
      <header className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Agent Dashboard<span className="text-primary">.</span>
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/agents/${user?.id}`)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Public Profile
              </button>
              <button
                onClick={() => navigate('/dashboard/settings')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiSettings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Navigation */}
      <nav className="bg-dark-800 border-b border-dark-700 mt-1 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto py-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-dark-800 rounded-xl p-6">
          {navigationItems.map((item) => (
            activeTab === item.id && (
              <div key={item.id} className="animate-fadeIn">
                <ErrorBoundary>
                  <item.component />
                </ErrorBoundary>
              </div>
            )
          ))}
        </div>
      </main>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-500/10 rounded-lg">
          <FiAlertCircle className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-gray-400 mb-4">
            {this.state.error?.message || 'An error occurred while loading this component'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AgentDashboard; 