import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPhone, FiHeart, FiStar, FiMapPin, FiMail } from 'react-icons/fi';

/**
 * @component AgentCard
 * @description Displays an agent's information in a card format with interactive features
 */
export const AgentCard = ({ 
  agent, 
  isFavorite, 
  onToggleFavorite,
  variant = 'default',
  showContactInfo = true,
  className = ''
}) => {
  const [showPhone, setShowPhone] = useState(false);

  // Error handling for required agent properties
  if (!agent?.fullName || !agent?.profileImage) {
    console.error('AgentCard: Missing required agent properties');
    return null;
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(agent._id);
    }
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    setShowPhone(!showPhone);
  };

  return (
    <div className={`
      bg-dark-900/40 backdrop-blur-md border border-primary/10 rounded-2xl 
      overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 
      transition-all duration-300
      ${className}
    `}>
      {/* Agent Image Section */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={agent.profileImage}
          alt={agent.fullName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/images/default-agent.jpg'; // Fallback image
            console.warn('AgentCard: Failed to load agent image');
          }}
        />
        
        {/* Experience Badge */}
        {agent.experience && (
          <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {agent.experience}
          </div>
        )}

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`
              absolute top-4 right-4 p-2 rounded-full backdrop-blur-md
              ${isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-dark-900/60 text-gray-400 hover:bg-dark-900/80'
              } 
              hover:scale-110 transition-all duration-300
            `}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Agent Info Section */}
      <div className="p-8 bg-dark-900/40 backdrop-blur-md">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{agent.fullName}</h3>
            <p className="text-primary-400">{agent.title}</p>
          </div>
          {agent.rating && (
            <div className="flex items-center gap-1 text-primary">
              <FiStar className="w-5 h-5" />
              <span className="font-bold">{agent.rating}</span>
            </div>
          )}
        </div>

        {/* Location */}
        {agent.location && (
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <FiMapPin className="text-primary-400" />
            <span>{agent.location}</span>
          </div>
        )}

        {/* Specialties */}
        {agent.specialties && agent.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {agent.specialties.map((specialty, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 backdrop-blur-sm text-primary-400 px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {/* Contact Information */}
        {showContactInfo && (
          <div className="space-y-3 mt-6 pt-6 border-t border-gray-700">
            {agent.email && (
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FiMail className="w-5 h-5" />
                <span>{agent.email}</span>
              </a>
            )}
            
            {agent.phone && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <FiPhone className="w-5 h-5" />
                  <span>{showPhone ? agent.phone : '*** *** ****'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fullName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    location: PropTypes.string,
    experience: PropTypes.string,
    rating: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    specialties: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'detailed']),
  showContactInfo: PropTypes.bool,
  className: PropTypes.string,
};

export default AgentCard; 