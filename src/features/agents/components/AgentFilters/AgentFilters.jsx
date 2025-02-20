import PropTypes from 'prop-types';
import { FiSearch, FiMapPin, FiAward, FiStar, FiTag } from 'react-icons/fi';
import { EXPERIENCE_RANGES, AGENT_SPECIALTIES, RATING_OPTIONS } from '../../constants/filterOptions';

export const AgentFilters = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key) => (e) => {
    onFilterChange(key, e.target.value);
  };

  return (
    <div className="w-full bg-dark-800/40 backdrop-blur-md rounded-xl p-6 space-y-4">
      {/* Search by Name */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by agent name..."
          value={filters.name}
          onChange={handleChange('name')}
          className="w-full pl-10 pr-4 py-2 bg-dark-900/40 border border-primary/10 rounded-lg 
                   text-white placeholder-gray-400 focus:outline-none focus:border-primary/30"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={handleChange('location')}
            className="w-full pl-10 pr-4 py-2 bg-dark-900/40 border border-primary/10 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:border-primary/30"
          />
        </div>

        {/* Specialty Filter */}
        <div className="relative">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filters.specialty}
            onChange={handleChange('specialty')}
            className="w-full pl-10 pr-4 py-2 bg-dark-900/40 border border-primary/10 rounded-lg 
                     text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/30"
          >
            <option value="">All Specialties</option>
            {AGENT_SPECIALTIES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div className="relative">
          <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filters.experience}
            onChange={handleChange('experience')}
            className="w-full pl-10 pr-4 py-2 bg-dark-900/40 border border-primary/10 rounded-lg 
                     text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/30"
          >
            <option value="">Any Experience</option>
            {EXPERIENCE_RANGES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <FiStar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filters.rating}
            onChange={handleChange('rating')}
            className="w-full pl-10 pr-4 py-2 bg-dark-900/40 border border-primary/10 rounded-lg 
                     text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/30"
          >
            <option value="">Any Rating</option>
            {RATING_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={onReset}
          className="text-primary-400 hover:text-primary transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

AgentFilters.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default AgentFilters; 