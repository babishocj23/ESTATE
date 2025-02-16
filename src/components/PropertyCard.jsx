import { useState } from 'react';
import { FiHeart, FiPhone, FiMapPin, FiHome, FiDroplet, FiMaximize } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-dark-800 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <OptimizedImage
          src={property.image}
          alt={property.title}
          width={imageSizes.card.width}
          height={imageSizes.card.height}
          className="w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </div>
        {property.discount && (
          <div className="absolute top-4 right-16 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Save ${(property.discount / 1000).toFixed(0)}k
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-dark-900/80 text-gray-300 hover:bg-gray-600'
          } active:scale-95 touch-manipulation`}
        >
          <FiHeart className="text-xl" />
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{property.title}</h3>
            <div className="flex items-center flex-wrap gap-2">
              {property.discount ? (
                <>
                  <p className="text-primary-400 text-xl sm:text-2xl font-bold">${(property.price / 1000).toFixed(0)}k</p>
                  <p className="text-gray-400 text-base sm:text-lg line-through">
                    ${(property.originalPrice / 1000).toFixed(0)}k
                  </p>
                </>
              ) : (
                <p className="text-primary-400 text-xl sm:text-2xl font-bold">
                  ${(property.price / 1000).toFixed(0)}{property.type === 'rent' ? '/mo' : 'k'}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowContact(!showContact)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-600 text-white transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <FiPhone className="text-xl" />
            <span>Contact</span>
          </button>
        </div>
        {showContact && (
          <div className="mb-4 p-3 bg-primary-500/10 rounded-lg">
            <p className="text-white font-semibold">Agent Contact:</p>
            <p className="text-primary-400">+1 (555) 123-4567</p>
          </div>
        )}
        <p className="text-gray-400 mb-4 flex items-center gap-2">
          <FiMapPin className="flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </p>
        <div className="grid grid-cols-3 gap-2 text-gray-400 border-t border-gray-700 pt-4 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <FiHome className="flex-shrink-0" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDroplet className="flex-shrink-0" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMaximize className="flex-shrink-0" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 