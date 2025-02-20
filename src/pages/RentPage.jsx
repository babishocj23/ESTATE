import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import PropertyCard from '../components/properties/PropertyCard';
import { PropertySearch } from '../features/properties/components/PropertySearch';
import { usePropertySearch } from '../features/properties/hooks/usePropertySearch';

export default function RentPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const {
    searchResults,
    setSearchResults,
    isSearching,
    filters,
    handleFilterChange,
    handleSearch,
    clearSearch,
    getFilteredProperties
  } = usePropertySearch('rent');

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

  const rentalProperties = [
    {
      id: 101,
      title: "Modern Studio Apartment",
      price: 2500,
      location: "Downtown LA",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      beds: 1,
      baths: 1,
      sqft: 650,
      type: "rent",
      propertyType: "apartment"
    },
    {
      id: 102,
      title: "Luxury 2-Bedroom",
      price: 4500,
      location: "Beverly Hills",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "rent",
      propertyType: "apartment"
    },
    {
      id: 103,
      title: "Cozy House with Garden",
      price: 3800,
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3",
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "rent",
      propertyType: "house"
    },
    {
      id: 104,
      title: "Penthouse Suite",
      price: 7500,
      location: "Hollywood Hills",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3",
      beds: 3,
      baths: 3,
      sqft: 2200,
      type: "rent",
      propertyType: "penthouse"
    },
    {
      id: 105,
      title: "Beachfront Condo",
      price: 5200,
      location: "Venice Beach",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: "rent",
      propertyType: "condo"
    },
    {
      id: 106,
      title: "Urban Loft",
      price: 3300,
      location: "Arts District",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
      beds: 1,
      baths: 1,
      sqft: 950,
      type: "rent",
      propertyType: "apartment"
    },
    {
      id: 107,
      title: "Family Home",
      price: 6200,
      location: "Pacific Palisades",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "rent",
      propertyType: "house"
    },
    {
      id: 108,
      title: "Mountain View Villa",
      price: 8500,
      location: "Malibu",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: "rent",
      propertyType: "villa"
    },
    {
      id: 109,
      title: "Downtown Studio",
      price: 2800,
      location: "Financial District",
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3",
      beds: 1,
      baths: 1,
      sqft: 600,
      type: "rent",
      propertyType: "studio"
    }
  ];

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // Automatically search when filters change
  const handleFilterAndSearch = (e) => {
    handleFilterChange(e);
    // Use setTimeout to ensure state is updated before search
    setTimeout(() => handleSearch(rentalProperties), 0);
  };

  // Handle reset to show all properties immediately
  const handleReset = () => {
    clearSearch();
    // Show all properties sorted by price
    const sortedProperties = [...rentalProperties].sort((a, b) => a.price - b.price);
    setSearchResults(sortedProperties);
  };

  // Initial sort on component mount
  useEffect(() => {
    const sortedProperties = [...rentalProperties].sort((a, b) => a.price - b.price);
    setSearchResults(sortedProperties);
  }, [setSearchResults]);

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-48">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Find Your Ideal <span className="text-primary">Rental</span>
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Discover a rental property that fits your lifestyle and budget.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto -mt-32 px-4 relative z-10">
          <div className="bg-dark-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
            <PropertySearch
              filters={filters}
              onFilterChange={handleFilterAndSearch}
              onSearch={() => handleSearch(rentalProperties)}
              onReset={handleReset}
              type="rent"
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Available Rentals<span className="text-primary">.</span>
            </h2>
            <button 
              onClick={() => navigate('/rent')}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              View All Properties →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(searchResults.length > 0 ? searchResults : rentalProperties).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={toggleFavorite}
                priceDisplay="monthly"
                displayType="For Rent"
              />
            ))}
            {isSearching && (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400">Searching for properties...</p>
              </div>
            )}
            {!isSearching && searchResults.length === 0 && filters.location && (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400">No properties found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </div>
  );
} 