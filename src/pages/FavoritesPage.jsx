import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiArrowLeft, FiHeart, FiHome, FiDollarSign, FiPhone, FiSend } from 'react-icons/fi';
import { BiBed, BiBath } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../contexts/AuthContext';
import { getUserFavorites, properties, rentProperties, toggleFavorite } from '../lib/supabase';
import toast from 'react-hot-toast';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { user } = useAuth();
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data: favorites } = await getUserFavorites(user.id);
      const savedIds = favorites.map(f => f.property_id);
      const allProperties = [...properties, ...rentProperties];
      const savedProps = allProperties.filter(p => savedIds.includes(p.id));
      setFavoriteProperties(savedProps);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (propertyId) => {
    try {
      await toggleFavorite(user.id, propertyId);
      // Remove from local state immediately for better UX
      setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.success('Property removed from favorites');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  const formatPrice = (price, type) => {
    return type === 'rent' ? `$${price}/mo` : `$${(price / 1000).toFixed(0)}k`;
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleTelegram = (username) => {
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-dark-900/95 backdrop-blur-md border-b border-gray-800">
          <div className="px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center"
            >
              <FiArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Saved Properties</h1>
          </div>
        </div>
      )}

      {/* Properties List */}
      <div className="px-4 py-4">
        {!isMobile && (
          <h1 className="text-2xl font-bold text-white mb-6">Saved Properties</h1>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-gray-400 mt-4">Loading saved properties...</p>
          </div>
        ) : favoriteProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FiHeart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-gray-400 text-center">No saved properties yet</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-primary rounded-xl text-white text-sm"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProperties.map((property) => (
              <div
                key={property.id}
                className="bg-dark-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50"
              >
                <div className="relative h-48">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property.id);
                      }}
                      className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                    >
                      <FiHeart className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.type === 'rent' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-primary">
                      {formatPrice(property.price, property.type)}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <BiBed className="w-4 h-4" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BiBath className="w-4 h-4" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMaximize className="w-4 h-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  {/* Updated Action Buttons Section */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleCall(property.agent?.phone || '+1234567890')}
                      className="flex items-center justify-center gap-2 py-3 bg-dark-700 rounded-xl text-white text-sm font-medium hover:bg-dark-600 transition-colors group"
                    >
                      <FiPhone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Call</span>
                    </button>
                    <button
                      onClick={() => handleTelegram(property.agent?.telegram || 'estatebot')}
                      className="flex items-center justify-center gap-2 py-3 bg-dark-700 rounded-xl text-white text-sm font-medium hover:bg-dark-600 transition-colors group"
                    >
                      <FiSend className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Message</span>
                    </button>
                    <button
                      onClick={() => navigate(`/property/${property.id}`)}
                      className="flex items-center justify-center gap-2 py-3 bg-primary rounded-xl text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      Details
                    </button>
                  </div>

                  {/* Contact Info Preview */}
                  <div className="mt-3 px-3 py-2 bg-dark-700/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <img
                        src={property.agent?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
                        alt="Agent"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{property.agent?.name || 'Estate Agent'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 