import React, { useState, useEffect } from 'react';
import { FiSearch, FiSliders, FiHeart, FiUser, FiMapPin, FiMaximize } from 'react-icons/fi';
import { BiBed } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MobileNavBar from '../components/MobileNavBar';
import PropertyCard from '../components/properties/PropertyCard';
import { usePropertySearch } from '../features/properties/hooks/usePropertySearch';
import { PropertySearch } from '../features/properties/components/PropertySearch';
import { 
  toggleFavorite as toggleFavoriteAPI, 
  getUserFavorites,
  properties,
  bestOffers,
  rentProperties,
  rentSpecialOffers
} from '../lib/supabase';
import { toast } from 'react-hot-toast';

const tabs = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'topRated', label: 'Top Rates' },
  { id: 'bestOffers', label: 'Best Offers' },
  { id: 'mostViewed', label: 'Most Viewed' },
];

const MobileHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [activeAction, setActiveAction] = useState('rent');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyProperties, setNearbyProperties] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Initialize search functionality
  const {
    searchResults,
    setSearchResults,
    isSearching,
    filters,
    handleFilterChange,
    handleSearch,
    clearSearch
  } = usePropertySearch(activeAction);

  // Combine all properties for search
  const allProperties = [...properties, ...bestOffers];

  // Get properties based on active action
  const getPropertiesByAction = () => {
    switch (activeAction) {
      case 'rent':
        return [...rentProperties, ...rentSpecialOffers];
      case 'buy':
        return [...properties, ...bestOffers];
      default:
        return [];
    }
  };

  // Get special offers based on active action
  const getSpecialOffers = () => {
    return activeAction === 'rent' ? rentSpecialOffers : bestOffers;
  };

  // Effect to update search results when action changes
  useEffect(() => {
    const actionProperties = getPropertiesByAction();
    setSearchResults(actionProperties);
    handleSearch(actionProperties);
  }, [activeAction]);

  // Load user favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const { data, error } = await getUserFavorites(user.id);
        if (error) {
          console.error('Error loading favorites:', error);
          return;
        }
        if (data) {
          const favoriteIds = new Set(data.map(fav => fav.property_id));
          setFavorites(favoriteIds);
        }
      }
    };
    loadFavorites();
  }, [user]);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location (e.g., city center)
          setUserLocation({
            lat: 34.0522,  // Los Angeles coordinates as default
            lng: -118.2437
          });
        }
      );
    }
  }, []);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Get nearby properties based on user location
  const getNearbyProperties = () => {
    if (!userLocation) return [];
    
    const currentProperties = getPropertiesByAction();
    return currentProperties
      .map(property => {
        // Extract coordinates from location string (assuming format: "lat,lng")
        const [lat, lng] = property.coordinates 
          ? property.coordinates.split(',').map(Number)
          : [34.0522, -118.2437]; // Default to LA coordinates if none provided
        
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          lat,
          lng
        );
        
        return { ...property, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3); // Changed from 5 to 3 to show exactly 3 closest properties
  };

  // Update nearby properties when user location or active action changes
  useEffect(() => {
    if (userLocation) {
      const nearby = getNearbyProperties();
      setNearbyProperties(nearby);
    }
  }, [userLocation, activeAction]);

  // Updated toggleFavorite function to handle mock data
  const handleToggleFavorite = async (propertyId) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      // Optimistically update UI
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(propertyId)) {
          newFavorites.delete(propertyId);
        } else {
          newFavorites.add(propertyId);
        }
        return newFavorites;
      });

      // Only attempt to update database if user is logged in
      if (user) {
        const { error } = await toggleFavoriteAPI(user.id, propertyId);
        if (error) throw error;
      }

      // Show success toast
      toast(
        favorites.has(propertyId) ? 'Property removed from favorites' : 'Property saved to favorites',
        {
          icon: favorites.has(propertyId) ? '❌' : '❤️',
          style: {
            borderRadius: '12px',
            background: '#1f2937',
            color: '#fff',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            fontSize: '14px',
            padding: '12px 16px',
          },
        }
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert the optimistic update
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(propertyId)) {
          newFavorites.delete(propertyId);
        } else {
          newFavorites.add(propertyId);
        }
        return newFavorites;
      });
      
      toast.error('Failed to update favorites', {
        style: {
          borderRadius: '12px',
          background: '#1f2937',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '14px',
          padding: '12px 16px',
        },
      });
    }
  };

  const handleActionClick = (action: string) => {
    setActiveAction(action);
    clearSearch();
    setShowFilters(false);
    
    if (action === 'sell') {
      navigate('/sell');
      return;
    }

    // Reset filters and update results for buy/rent
    const actionProperties = action === 'rent' ? rentProperties : [...properties, ...bestOffers];
    setSearchResults(actionProperties);
    handleSearch(actionProperties);
  };

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange({
      target: {
        name: 'location',
        value: e.target.value
      }
    });
    // Perform search after a short delay
    setTimeout(() => handleSearch(allProperties), 300);
  };

  // Get filtered properties based on search and active tab
  const getFilteredProperties = () => {
    const currentProperties = getPropertiesByAction();
    let filtered = searchResults.length > 0 ? searchResults : currentProperties;

    // Apply tab filtering
    switch (activeTab) {
      case 'recommended':
        filtered = filtered.filter(p => p.rating >= 4.8);
        break;
      case 'topRated':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestOffers':
        filtered = filtered.filter(p => p.discount);
        break;
      case 'mostViewed':
        filtered = filtered.sort((a, b) => b.rating - a.rating); // Using rating as a proxy for views
        break;
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  // Format price based on action type
  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `$${price}/mo`;
    }
    return `$${(price / 1000).toFixed(0)}k`;
  };

  return (
    <div className="min-h-screen pb-20 bg-dark-900">
      {/* Header Section */}
      <div className="px-4 pt-6 pb-6">
        {/* Action Buttons */}
        <div className="flex gap-2 mb-6 max-w-[360px] mx-auto">
          <button
            onClick={() => handleActionClick('rent')}
            className={`flex-1 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeAction === 'rent'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-800/80 text-gray-300 hover:bg-dark-800'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => handleActionClick('buy')}
            className={`flex-1 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeAction === 'buy'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-800/80 text-gray-300 hover:bg-dark-800'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => handleActionClick('sell')}
            className={`flex-1 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeAction === 'sell'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-800/80 text-gray-300 hover:bg-dark-800'
            }`}
          >
            Sell
          </button>
          <button
            onClick={() => navigate('/find-agents')}
            className={`flex-1 px-4 py-2 rounded-full text-xs font-medium transition-all bg-dark-800/80 text-gray-300 hover:bg-dark-800`}
          >
            Agents
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="relative z-20">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-4 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={filters.location}
                  onChange={handleSearchInput}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-dark-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowMobileFilters(true)}
              className={`h-11 px-4 rounded-xl flex items-center gap-2 transition-colors ${
                Object.values(filters).some(Boolean)
                  ? 'bg-primary text-white'
                  : 'bg-dark-800 text-gray-400'
              }`}
            >
              <FiSliders className="w-4 h-4" />
              {Object.values(filters).some(Boolean) && (
                <span className="text-xs font-medium">Filters</span>
              )}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-800 text-gray-300 border border-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Panel - Slide Up */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowMobileFilters(false)}
          />
          
          {/* Filter Panel */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-dark-900 rounded-t-3xl">
            <div className="relative p-4">
              {/* Handle */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-3">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center mb-6 pt-2">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Done
                </button>
              </div>

              {/* Filter Content */}
              <div className="max-h-[70vh] overflow-y-auto">
                <PropertySearch
                  filters={filters}
                  onFilterChange={(e) => {
                    handleFilterChange(e);
                    handleSearch(allProperties);
                  }}
                  onSearch={() => {
                    handleSearch(allProperties);
                    setShowMobileFilters(false);
                  }}
                  onReset={() => {
                    clearSearch();
                    setShowMobileFilters(false);
                  }}
                  type={activeAction}
                />
              </div>

              {/* Apply Button */}
              <div className="pt-4 pb-2">
                <button
                  onClick={() => {
                    handleSearch(allProperties);
                    setShowMobileFilters(false);
                  }}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Featured Properties Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Featured Properties</h2>
            <button className="text-gray-300 text-sm">More</button>
          </div>
          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
            {getPropertiesByAction().slice(0, 3).map((property) => (
              <div
                key={property.id}
                className="relative min-w-[280px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-primary font-semibold">
                      {formatPrice(property.price, property.type)}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        favorites.has(property.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-primary/20 text-primary'
                      }`}
                    >
                      <FiHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Near You Section */}
        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Near You</h2>
            <button 
              className="text-gray-300 text-sm"
              onClick={() => navigate('/map')}
            >
              View Map
            </button>
          </div>
          <div className="space-y-4">
            {nearbyProperties.length > 0 ? (
              nearbyProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex gap-4 bg-dark-800/40 backdrop-blur-md p-3 rounded-2xl border border-gray-700/50 active:scale-[0.99] transition-transform"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white line-clamp-1">
                          {property.title}
                        </h3>
                        <span className="text-sm text-primary font-medium">
                          {formatPrice(property.price, property.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                        <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {property.location} • {property.distance.toFixed(1)} km away
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <BiBed className="w-3.5 h-3.5" />
                          {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMaximize className="w-3.5 h-3.5" />
                          {property.sqft}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(property.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          favorites.has(property.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-primary/20 text-primary'
                        }`}
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FiMapPin className="w-8 h-8 mx-auto mb-3 text-gray-500" />
                <p>No properties found nearby</p>
                <p className="text-sm mt-1">Try adjusting your location or search criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Results or Default Content */}
        {isSearching ? (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-400">Searching for properties...</p>
          </div>
        ) : searchResults.length > 0 && filters.location ? (
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Search Results</h2>
            </div>
            <div className="space-y-4">
              {searchResults.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                  priceDisplay={property.type === 'rent' ? 'monthly' : 'total'}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Special Offers Section */}
        {getSpecialOffers().length > 0 && (
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {activeAction === 'rent' ? 'Special Offers' : 'Best Offers'}
              </h2>
              <button className="text-gray-300 text-sm">More</button>
            </div>
            <div className="space-y-4">
              {getSpecialOffers().map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                  priceDisplay={property.type === 'rent' ? 'monthly' : 'total'}
                  displayType="Special Offer"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavBar />
    </div>
  );
};

export default MobileHomePage; 