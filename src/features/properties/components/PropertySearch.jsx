import React, { useState } from 'react';
import { FiSearch, FiDollarSign, FiHome, FiDroplet, FiFilter, FiX, FiMapPin } from 'react-icons/fi';
import { 
  PRICE_RANGES, 
  PROPERTY_TYPES, 
  BEDROOM_OPTIONS, 
  BATHROOM_OPTIONS 
} from '../constants/filterOptions';
import '../styles/propertyStyles.css';

export const PropertySearch = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onReset,
  type = 'buy'
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const priceRanges = PRICE_RANGES[type] || PRICE_RANGES.buy;
  const propertyTypes = PROPERTY_TYPES[type] || PROPERTY_TYPES.all;

  return (
    <div className="space-y-4">
      {/* Primary Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 grid sm:grid-cols-3 gap-4">
          {/* Location Search */}
          <div className="relative">
            <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-dark-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700"
              value={filters.location}
              onChange={onFilterChange}
              name="location"
            />
          </div>

          {/* Property Type */}
          <div className="relative">
            <FiHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-dark-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700 appearance-none cursor-pointer"
              value={filters.propertyType}
              onChange={onFilterChange}
              name="propertyType"
            >
              <option value="">Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="relative">
            <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-dark-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700 appearance-none cursor-pointer"
              value={filters.priceRange}
              onChange={onFilterChange}
              name="priceRange"
            >
              <option value="">Price Range</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-6 h-14 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 ${
              showAdvancedFilters 
                ? 'border-primary bg-primary/10 text-white' 
                : 'border-gray-700 text-gray-400 hover:border-primary/50'
            }`}
          >
            <FiFilter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button
            onClick={onSearch}
            className="px-8 h-14 rounded-2xl bg-primary hover:bg-primary-600 text-white transition-all duration-300 flex items-center gap-2"
          >
            <FiSearch className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
      
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">Bedrooms</label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                  value={filters.beds}
                  onChange={onFilterChange}
                  name="beds"
                >
                  <option value="">Any Beds</option>
                  {BEDROOM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">Bathrooms</label>
              <div className="relative">
                <FiDroplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                  value={filters.baths}
                  onChange={onFilterChange}
                  name="baths"
                >
                  <option value="">Any Baths</option>
                  {BATHROOM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onReset}
              className="px-6 h-12 rounded-xl bg-dark-800 text-white hover:bg-dark-700 transition-all active:scale-95 text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 