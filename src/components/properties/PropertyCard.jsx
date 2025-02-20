import { useState } from 'react';
import { FiHeart, FiPhone, FiMapPin, FiHome, FiDroplet, FiMaximize } from 'react-icons/fi';
import OptimizedImage from '../OptimizedImage';
import { imageSizes } from '../../utils/imageOptimizer';

const PropertyCard = ({ 
  property, 
  isFavorite, 
  onToggleFavorite,
  useOptimizedImage = true, // Default to using optimized image
  priceDisplay = "total", // 'total' or 'monthly'
  displayType, // Override the display type (e.g., "For Sale", "For Rent")
}) => {
  const [showContact, setShowContact] = useState(false);

  // Determine the display type based on property type or override
  const getDisplayType = () => {
    if (displayType) return displayType;
    if (property.type === 'rent') return 'For Rent';
    return 'For Sale';
  };

  // Format price based on display type and property data
  const formatPrice = () => {
    if (priceDisplay === 'monthly') {
      return `$${property.price}/mo`;
    }
    return `$${(property.price / 1000).toFixed(0)}k`;
  };

  const ImageComponent = useOptimizedImage ? (
    <OptimizedImage
      src={property.image}
      alt={property.title}
      width={imageSizes.card.width}
      height={imageSizes.card.height}
      className="w-full h-full group-hover:scale-110 transition-transform duration-300"
    />
  ) : (
    <img
      src={property.image}
      alt={property.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
    />
  );

  return (
    <div className="bg-dark-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10 touch-manipulation">
      <div className="relative h-48 sm:h-64 overflow-hidden rounded-xl sm:rounded-2xl">
        {ImageComponent}
        <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 text-xs sm:text-sm rounded-full">
          {getDisplayType()}
        </div>
        {property.discount && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs sm:text-sm rounded-full">
            Save ${(property.discount / 1000).toFixed(0)}k
          </div>
        )}
      </div>
      <div className="p-3 sm:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{property.title}</h3>
            <div className="flex items-center">
              {property.discount ? (
                <>
                  <p className="text-primary-400 text-xl sm:text-2xl font-bold">{formatPrice()}</p>
                  <p className="text-gray-400 text-base sm:text-lg line-through ml-2">
                    ${(property.originalPrice / 1000).toFixed(0)}k
                  </p>
                </>
              ) : (
                <p className="text-primary-400 text-xl sm:text-2xl font-bold">{formatPrice()}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className={`p-2 rounded-full transition-colors duration-200 touch-manipulation ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FiHeart className="text-lg sm:text-xl" />
            </button>
            <button 
              onClick={() => setShowContact(!showContact)}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200 touch-manipulation"
            >
              <FiPhone className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>
        {showContact && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-primary-500/10 rounded-lg">
            <p className="text-white text-sm sm:text-base font-semibold">Agent Contact:</p>
            <p className="text-primary-400 text-sm sm:text-base">+1 (555) 123-4567</p>
          </div>
        )}
        <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
          <FiMapPin className="inline-block mr-2" />
          {property.location}
        </p>
        <div className="flex justify-between text-gray-400 text-sm sm:text-base border-t border-gray-700 pt-3 sm:pt-4">
          <span className="flex items-center">
            <FiHome className="mr-1 sm:mr-2" /> {property.beds}
          </span>
          <span className="flex items-center">
            <FiDroplet className="mr-1 sm:mr-2" /> {property.baths}
          </span>
          <span className="flex items-center">
            <FiMaximize className="mr-1 sm:mr-2" /> {property.sqft}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 