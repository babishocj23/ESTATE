import PropTypes from 'prop-types';
import { AgentCard } from '../AgentCard/AgentCard';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../../../components/common/ErrorMessage';

export const AgentSearchResults = ({
  agents,
  loading,
  error,
  totalAgents,
  favorites = [],
  onToggleFavorite
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!agents.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-400">No agents found matching your criteria</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="text-gray-400">
        Found {totalAgents} agent{totalAgents !== 1 ? 's' : ''}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent._id}
            agent={agent}
            isFavorite={favorites.includes(agent._id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

AgentSearchResults.propTypes = {
  agents: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  totalAgents: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onToggleFavorite: PropTypes.func,
};

export default AgentSearchResults; 