import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { rentProperties } from '../lib/supabase';

const MapPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [properties] = useState(rentProperties);

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
            <h1 className="text-xl font-bold text-white">Nearby Properties</h1>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative h-[calc(100vh-64px)]">
        <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <FiMapPin className="w-8 h-8 mx-auto mb-2" />
            <p>Map integration coming soon</p>
          </div>
        </div>

        {/* Property List Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-md p-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Nearby Properties</h2>
            <span className="text-sm text-gray-400">{properties.length} found</span>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 w-64 bg-dark-800 rounded-xl overflow-hidden"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-white mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                    <p className="text-primary font-medium mt-2">${property.price}/mo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 