import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { BiBed } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  
  // Example data - replace with real data from your favorites system
  const [favoriteProperties] = useState([
    {
      id: '1',
      title: 'Woodland Apartment',
      price: 340,
      location: '1012 Ocean avenue, New york, USA',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      rating: 4.9,
      type: 'Apartment',
      sqft: 1225,
      beds: 3.0,
    },
    {
      id: '2',
      title: 'Modern Villa',
      price: 450,
      location: '788 Park Avenue, New york, USA',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      rating: 4.8,
      type: 'Villa',
      sqft: 1500,
      beds: 4.0,
    },
  ]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
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
        
        {favoriteProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FiHeart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-gray-400 text-center">No saved properties yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property.id)}
                className="flex gap-4 bg-dark-800/40 backdrop-blur-md p-3 rounded-2xl border border-gray-700/50 active:scale-[0.99] transition-transform cursor-pointer"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white">{property.rating}</span>
                      </div>
                      <h3 className="font-semibold text-white">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        {property.location}
                      </p>
                    </div>
                    <span className="text-sm text-primary font-medium">
                      ${property.price}/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiMaximize className="w-4 h-4" />
                      {property.sqft} sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <BiBed className="w-4 h-4" />
                      {property.beds} Beds
                    </span>
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