import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiDollarSign, FiHome, FiDroplet, FiMaximize, FiFilter, FiHeart, FiPhone, FiArrowRight } from 'react-icons/fi';
import { properties } from '../data/properties';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import PropertyCard from '../components/properties/PropertyCard';
import { imageSizes } from '../utils/imageOptimizer';
import { PropertySearch } from '../features/properties/components/PropertySearch';
import { usePropertySearch } from '../features/properties/hooks/usePropertySearch';

export default function BuyPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const {
    searchResults,
    setSearchResults,
    isSearching,
    filters,
    handleFilterChange,
    handleSearch,
    clearSearch
  } = usePropertySearch('buy');

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  // Map the properties to include propertyType
  const buyProperties = properties.map(property => ({
    ...property,
    type: 'buy',
    propertyType: property.type || 'house' // Ensure backward compatibility
  }));

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // Automatically search when filters change
  const handleFilterAndSearch = (e) => {
    handleFilterChange(e);
    setTimeout(() => handleSearch(buyProperties), 0);
  };

  // Handle reset to show all properties immediately
  const handleReset = () => {
    clearSearch();
    const sortedProperties = [...buyProperties].sort((a, b) => a.price - b.price);
    setSearchResults(sortedProperties);
  };

  // Initial sort on component mount
  useEffect(() => {
    const sortedProperties = [...buyProperties].sort((a, b) => a.price - b.price);
    setSearchResults(sortedProperties);
  }, [setSearchResults]);

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-32 sm:pb-48">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                Find Your Perfect <span className="text-primary">Home</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-4">
                Find the perfect place to call home.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto -mt-24 sm:-mt-32 px-4 relative z-10">
          <div className="bg-dark-900/40 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
            <PropertySearch
              filters={filters}
              onFilterChange={handleFilterAndSearch}
              onSearch={() => handleSearch(buyProperties)}
              onReset={handleReset}
              type="buy"
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Properties for Sale<span className="text-primary">.</span>
            </h2>
            <button 
              onClick={() => navigate('/buy')}
              className="text-primary hover:text-primary-dark transition-colors text-sm sm:text-base"
            >
              View All Properties →
            </button>
          </div>
          
          {/* Grid with responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(searchResults.length > 0 ? searchResults : buyProperties).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={toggleFavorite}
                priceDisplay="total"
                displayType="For Sale"
              />
            ))}
          </div>

          {/* Loading and No Results States */}
          {isSearching && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-400">Searching for properties...</p>
            </div>
          )}
          {!isSearching && searchResults.length === 0 && filters.location && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-400">No properties found matching your search criteria.</p>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </div>
  );
} 