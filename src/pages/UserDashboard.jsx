import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.user_metadata?.full_name || 'User'}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your favorite properties and account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Favorites Section */}
          <div className="bg-dark-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Favorites<span className="text-primary">.</span>
            </h2>
            <p className="text-gray-400">Your saved properties will appear here.</p>
          </div>

          {/* Account Settings */}
          <div className="bg-dark-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Account Settings<span className="text-primary">.</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <p className="text-white">{user?.user_metadata?.full_name || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <p className="text-white capitalize">{user?.user_metadata?.role || 'User'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 