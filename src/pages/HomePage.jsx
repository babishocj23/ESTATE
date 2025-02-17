import { FiMapPin, FiDollarSign, FiHome, FiDroplet, FiMaximize, FiHeart, FiPhone } from "react-icons/fi";
import { useState, useEffect } from "react";
import Newsletter from "../components/Newsletter";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    price: 450000,
    location: "123 Luxury Lane, Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
    beds: 3,
    baths: 2,
    sqft: 1200,
    type: "featured",
    discount: null,
  },
  {
    id: 2,
    title: "Luxury Villa",
    price: 1200000,
    location: "456 Elite Avenue, Miami, FL",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3",
    beds: 5,
    baths: 4,
    sqft: 3500,
    type: "featured",
    discount: null,
  },
  {
    id: 3,
    title: "Cozy House",
    price: 350000,
    location: "789 Comfort Street, Austin, TX",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
    beds: 2,
    baths: 2,
    sqft: 1000,
    type: "featured",
    discount: null,
  },
  {
    id: 4,
    title: "Seaside Villa",
    price: 890000,
    location: "321 Ocean Drive, San Diego, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "featured",
    discount: null,
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    price: 275000,
    location: "567 Pine Road, Denver, CO",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3",
    beds: 2,
    baths: 1,
    sqft: 900,
    type: "featured",
    discount: null,
  },
  {
    id: 6,
    title: "Urban Penthouse",
    price: 1500000,
    location: "999 Sky Heights, New York, NY",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3",
    beds: 3,
    baths: 3,
    sqft: 2000,
    type: "featured",
    discount: null,
  },
  {
    id: 7,
    title: "Beach House Special",
    price: 749000,
    originalPrice: 899000,
    location: "101 Coastal Way, Malibu, CA",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "offer",
    discount: 150000,
  },
  {
    id: 8,
    title: "Downtown Loft",
    price: 399000,
    originalPrice: 459000,
    location: "202 City Center, Chicago, IL",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
    beds: 1,
    baths: 1,
    sqft: 950,
    type: "offer",
    discount: 60000,
  },
  {
    id: 9,
    title: "Garden Estate",
    price: 879000,
    originalPrice: 999000,
    location: "303 Green Valley, Portland, OR",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3",
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "offer",
    discount: 120000,
  }
];

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10">
      <div className="relative h-64 overflow-hidden rounded-2xl">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                  <p className="text-gray-400 text-lg line-through ml-2">${(property.originalPrice / 1000).toFixed(0)}k</p>
                </>
              ) : (
                <p className="text-primary-400 text-2xl font-bold">${(property.price / 1000).toFixed(0)}k</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onToggleFavorite(property.id)}
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

export default function HomePage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    beds: ''
  });
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    let results = [...properties];

    if (searchParams.location) {
      results = results.filter(property => 
        property.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.priceRange) {
      const [min, max] = searchParams.priceRange.split('-').map(Number);
      results = results.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max;
        }
        return property.price >= min;
      });
    }

    if (searchParams.beds) {
      const minBeds = parseInt(searchParams.beds);
      results = results.filter(property => property.beds >= minBeds);
    }

    setFilteredProperties(results);
    // Scroll to featured properties section
    document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const featuredProperties = (filteredProperties.length > 0 ? filteredProperties : properties).filter(p => p.type === 'featured');
  const bestOffers = properties.filter(p => p.type === 'offer');

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Dream <span className="text-primary">Home</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Your journey to the perfect property starts here.
          </p>
          
          {/* Search Form */}
          <div className="bg-dark-900/40 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/5 w-full max-w-4xl hover:shadow-primary/5 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
              <div className="relative md:col-span-3">
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                  <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleSearchChange}
                    placeholder="Enter location"
                    className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-white/5 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400 hover:border-primary/20 transition-colors"
                  />
                </div>
              </div>
              <div className="relative md:col-span-3">
                <div className="relative">
                  <FiHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                  <select
                    name="propertyType"
                    value={searchParams.propertyType}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-white/5 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400 hover:border-primary/20 transition-colors appearance-none"
                  >
                    <option value="">Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>
              </div>
              <div className="relative md:col-span-3">
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                  <select
                    name="priceRange"
                    value={searchParams.priceRange}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-white/5 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400 hover:border-primary/20 transition-colors appearance-none"
                  >
                    <option value="">Price Range</option>
                    <option value="100000-300000">$100k - $300k</option>
                    <option value="300000-500000">$300k - $500k</option>
                    <option value="500000-1000000">$500k - $1M</option>
                    <option value="1000000">$1M+</option>
                  </select>
                </div>
              </div>
              <div className="relative md:col-span-2">
                <button
                  onClick={handleSearch}
                  className="w-full py-3 px-8 bg-primary hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Offers Section */}
      <div className="-mt-32 relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Best Offers<span className="text-primary">.</span>
            </h2>
            <button className="text-primary hover:text-primary-dark transition-colors">
              View All Properties →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestOffers.map(property => (
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

      {/* Featured Properties */}
      <div id="featured-properties" className="py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                {filteredProperties.length > 0 ? 'Search Results' : 'Featured Properties'}<span className="text-primary">.</span>
              </h2>
              {filteredProperties.length > 0 && (
                <button 
                  onClick={() => setFilteredProperties([])} 
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            
            {filteredProperties.length === 0 && featuredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No properties found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
