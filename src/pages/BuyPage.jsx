import { useState } from 'react';
import { FiSearch, FiMapPin, FiDollarSign, FiHome, FiDroplet, FiMaximize, FiFilter, FiHeart, FiPhone, FiArrowRight } from 'react-icons/fi';
import { properties } from '../data/properties';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import OptimizedImage from '../components/OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

export default function BuyPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    propertyType: '',
    beds: '',
    baths: '',
  });
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProperties = properties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (property.price < min || property.price > max) return false;
    }
    if (filters.beds && property.beds < parseInt(filters.beds)) return false;
    if (filters.baths && property.baths < parseInt(filters.baths)) return false;
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    return true;
  });

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-48">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Find Your Perfect <span className="text-primary">Home</span>
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Find the perfect place to call home.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto -mt-32 px-4 relative z-10">
          <div className="bg-dark-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="search-input"
                  value={filters.location}
                  onChange={handleFilterChange}
                  name="location"
                />
              </div>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="search-select"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  name="priceRange"
                >
                  <option value="">Price Range</option>
                  <option value="0-500000">$0 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="search-select"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  name="propertyType"
                >
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
            </div>
            
            {/* Additional Filters */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="search-select"
                  value={filters.beds}
                  onChange={handleFilterChange}
                  name="beds"
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1+ Bed</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                </select>
              </div>
              <div className="relative">
                <FiDroplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="search-select"
                  value={filters.baths}
                  onChange={handleFilterChange}
                  name="baths"
                >
                  <option value="">Bathrooms</option>
                  <option value="1">1+ Bath</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-primary hover:bg-primary-600 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                Properties for Sale<span className="text-primary">.</span>
              </h2>
              <button 
                onClick={() => navigate('/buy')}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                View All Properties →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </div>
  );
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10">
      <div className="relative h-64 overflow-hidden rounded-2xl">
        <OptimizedImage
          src={property.image}
          alt={property.title}
          width={imageSizes.card.width}
          height={imageSizes.card.height}
          className="w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
          For Sale
        </div>
        {property.discount && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Save ${(property.discount / 1000).toFixed(0)}k
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
            <div className="flex items-center">
              {property.discount ? (
                <>
                  <p className="text-primary-400 text-2xl font-bold">${(property.price / 1000).toFixed(0)}k</p>
                  <p className="text-gray-400 text-lg line-through ml-2">
                    ${(property.originalPrice / 1000).toFixed(0)}k
                  </p>
                </>
              ) : (
                <p className="text-primary-400 text-2xl font-bold">${(property.price / 1000).toFixed(0)}k</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FiHeart className="text-xl" />
            </button>
            <button
              onClick={() => setShowContact(!showContact)}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
            >
              <FiPhone className="text-xl" />
            </button>
          </div>
        </div>
        {showContact && (
          <div className="mb-4 p-3 bg-primary-500/10 rounded-lg">
            <p className="text-white font-semibold">Agent Contact:</p>
            <p className="text-primary-400">+1 (555) 123-4567</p>
          </div>
        )}
        <p className="text-gray-400 mb-4">
          <FiMapPin className="inline-block mr-2" />
          {property.location}
        </p>
        <div className="flex justify-between text-gray-400 border-t border-gray-700 pt-4">
          <span className="flex items-center">
            <FiHome className="mr-2" /> {property.beds} Beds
          </span>
          <span className="flex items-center">
            <FiDroplet className="mr-2" /> {property.baths} Baths
          </span>
          <span className="flex items-center">
            <FiMaximize className="mr-2" /> {property.sqft} sqft
          </span>
        </div>
      </div>
    </div>
  );
}; 