import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiPhone, FiHome, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-dark-800/40 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {user?.user_metadata?.full_name || 'User'}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-dark-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 text-white hover:bg-dark-700/60 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FiHome className="w-5 h-5 text-primary" />
            </div>
            <span>My Properties</span>
          </button>

          <button className="flex items-center gap-3 p-4 bg-dark-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 text-white hover:bg-dark-700/60 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FiHeart className="w-5 h-5 text-primary" />
            </div>
            <span>Saved Properties</span>
          </button>
        </div>

        {/* Settings Section */}
        <div className="mt-6 bg-dark-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-dark-700/40 rounded-xl text-white hover:bg-dark-600/40 transition-colors">
              <div className="flex items-center gap-3">
                <FiSettings className="w-5 h-5 text-primary" />
                <span>Account Settings</span>
              </div>
            </button>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 bg-dark-700/40 rounded-xl text-red-400 hover:bg-dark-600/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FiLogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 