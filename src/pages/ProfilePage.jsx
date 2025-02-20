import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiPhone, FiHome, FiHeart, FiSettings, FiLogOut, FiEdit2, FiClock, FiTrash2, FiChevronRight, FiMapPin, FiDollarSign, FiBriefcase, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { supabase, getUserFavorites, properties, rentProperties } from '../lib/supabase';
import { useMediaQuery } from 'react-responsive';
import toast from 'react-hot-toast';

// Sample published properties
const samplePublishedProperties = [
  {
    id: 'pub-1',
    title: 'Luxury Penthouse',
    type: 'sell',
    price: 850000,
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    status: 'active',
    views: 245,
    savedBy: 12,
    publishedDate: new Date('2024-02-15').toISOString()
  },
  {
    id: 'pub-2',
    title: 'Studio Apartment',
    type: 'rent',
    price: 1800,
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    status: 'active',
    views: 187,
    savedBy: 8,
    publishedDate: new Date('2024-03-01').toISOString()
  }
];

// Sample draft data
const sampleDrafts = [
  {
    id: 'draft-1',
    title: 'Modern Apartment in Downtown',
    listingType: 'rent',
    progress: 75,
    lastEdited: new Date('2024-03-15').toISOString(),
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    description: 'Luxury apartment with stunning views',
    price: 2500,
    location: 'Downtown',
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: 'draft-2',
    title: 'Cozy Family House',
    listingType: 'sell',
    progress: 45,
    lastEdited: new Date('2024-03-14').toISOString(),
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994'],
    description: 'Perfect family home in quiet neighborhood',
    price: 450000,
    location: 'Suburbs',
    bedrooms: 4,
    bathrooms: 3
  }
];

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeTab, setActiveTab] = useState('published');
  const [myProperties, setMyProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [listingDrafts, setListingDrafts] = useState([]);
  const [publishedProperties, setPublishedProperties] = useState([]);

  // Fetch user's properties, saved properties and drafts
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch saved properties
      const { data: favorites } = await getUserFavorites(user.id);
      const savedIds = favorites.map(f => f.property_id);
      const allProperties = [...properties, ...rentProperties];
      const savedProps = allProperties.filter(p => savedIds.includes(p.id));
      setSavedProperties(savedProps);

      // Fetch user's published properties
      const { data: userProps } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id);
      
      // Combine database properties with sample properties
      const combinedProperties = [
        ...(userProps || []),
        ...samplePublishedProperties
      ];
      setPublishedProperties(combinedProperties);

      // Get drafts from localStorage or use sample drafts
      const storedDrafts = localStorage.getItem(`property_drafts_${user.id}`);
      const drafts = storedDrafts ? JSON.parse(storedDrafts) : sampleDrafts;
      setListingDrafts(drafts);
      
      if (!storedDrafts) {
        localStorage.setItem(`property_drafts_${user.id}`, JSON.stringify(sampleDrafts));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load your data');
    }
  };

  const handleDeleteDraft = (draftId) => {
    try {
      const updatedDrafts = listingDrafts.filter(draft => draft.id !== draftId);
      setListingDrafts(updatedDrafts);
      localStorage.setItem(`property_drafts_${user.id}`, JSON.stringify(updatedDrafts));
      toast.success('Draft deleted successfully');
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
    }
  };

  const handleContinueDraft = (draft) => {
    try {
      // Store the current draft in localStorage for the sell page
      localStorage.setItem('current_draft', JSON.stringify(draft));
      navigate('/sell', { state: { draft } });
    } catch (error) {
      console.error('Error continuing draft:', error);
      toast.error('Failed to continue draft');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const formatPrice = (price, type) => {
    return type === 'rent' ? `$${price}/mo` : `$${(price / 1000).toFixed(0)}k`;
  };

  const getCountryFromLocation = (location) => {
    const parts = location.split(',');
    return parts[parts.length - 1].trim();
  };

  const renderPropertyList = () => {
    switch (activeTab) {
      case 'published':
        return publishedProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
            className="bg-dark-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-primary/10 active:scale-[0.98] transition-transform touch-manipulation"
          >
            <div className="relative h-40">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold truncate">{property.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <FiMapPin className="w-3 h-3" />
                  <span className="truncate">{getCountryFromLocation(property.location)}</span>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary`}>
                  {property.type === 'rent' ? 'Rent' : 'Sale'}
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary font-semibold">
                  {formatPrice(property.price, property.type)}
                </span>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{property.views} views</span>
                  <span>{property.savedBy} saved</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Published {new Date(property.publishedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ));
      
      case 'saved':
        return savedProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
            className="bg-dark-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-primary/10 active:scale-[0.98] transition-transform touch-manipulation"
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-dark-700 flex-shrink-0">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-medium truncate">{property.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.type === 'rent' ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'
                  }`}>
                    {property.type === 'rent' ? 'Rent' : 'Sale'}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                  <FiMapPin className="w-4 h-4" />
                  <span className="truncate">{getCountryFromLocation(property.location)}</span>
                </div>
                <div className="mt-2">
                  <span className="text-primary font-semibold">
                    {formatPrice(property.price, property.type)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ));
      
      case 'drafts':
        return listingDrafts.map((draft) => (
          <div key={draft.id} className="bg-dark-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50">
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-dark-700 flex-shrink-0">
                {draft.images?.[0] ? (
                  <img 
                    src={draft.images[0]} 
                    alt={draft.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiHome className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-medium truncate">{draft.title || 'Untitled Property'}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    draft.listingType === 'rent' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {draft.listingType === 'rent' ? 'Rent' : 'Sell'}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                  <FiClock className="w-4 h-4" />
                  <span>Last edited {new Date(draft.lastEdited).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${draft.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{draft.progress || 0}%</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button 
                    onClick={() => handleContinueDraft(draft)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-700 rounded-lg text-sm text-white hover:bg-dark-600 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Continue
                  </button>
                  <button 
                    onClick={() => handleDeleteDraft(draft.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-700 rounded-lg text-sm text-red-400 hover:bg-dark-600 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ));
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-dark-800/40 backdrop-blur-md rounded-2xl p-4 mb-6 border border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {user?.user_metadata?.full_name || 'User'}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* My Properties Section */}
        <div className="bg-dark-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50">
          {/* Section Header */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">My Properties</h2>
              <button 
                onClick={() => navigate('/sell')}
                className="flex items-center gap-2 px-4 py-2 bg-primary rounded-xl text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                Sell/Rent
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('published')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'published'
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                Published ({publishedProperties.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'saved'
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                Saved ({savedProperties.length})
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'drafts'
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                Drafts ({listingDrafts.length})
              </button>
            </div>
          </div>

          {/* Property List */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderPropertyList()}
            </div>
            
            {/* Empty States */}
            {activeTab === 'published' && publishedProperties.length === 0 && (
              <div className="text-center py-8">
                <FiBriefcase className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No published properties yet</p>
                <button 
                  onClick={() => navigate('/sell')}
                  className="mt-4 px-6 py-2 bg-primary rounded-xl text-white text-sm"
                >
                  Create Listing
                </button>
              </div>
            )}
            
            {activeTab === 'saved' && savedProperties.length === 0 && (
              <div className="text-center py-8">
                <FiHeart className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No saved properties</p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-4 px-6 py-2 bg-primary rounded-xl text-white text-sm"
                >
                  Browse Properties
                </button>
              </div>
            )}
            
            {activeTab === 'drafts' && listingDrafts.length === 0 && (
              <div className="text-center py-8">
                <FiEdit2 className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No draft listings</p>
                <button 
                  onClick={() => navigate('/sell')}
                  className="mt-4 px-6 py-2 bg-primary rounded-xl text-white text-sm"
                >
                  Create Draft
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-6 bg-dark-800/40 backdrop-blur-md rounded-2xl p-4 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-dark-700/40 rounded-xl text-white hover:bg-dark-600/40 transition-colors">
              <div className="flex items-center gap-3">
                <FiSettings className="w-5 h-5 text-primary" />
                <span className="text-sm">Account Settings</span>
              </div>
            </button>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-3 bg-dark-700/40 rounded-xl text-red-400 hover:bg-dark-600/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FiLogOut className="w-5 h-5" />
                <span className="text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 