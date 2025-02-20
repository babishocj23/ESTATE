import { useState } from 'react';

export const usePropertySearch = (type = 'buy') => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    propertyType: '',
    beds: '',
    baths: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (properties) => {
    setIsSearching(true);
    
    const filteredProperties = properties.filter(property => {
      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (property.price < min || property.price > max)) return false;
        if (!max && property.price < min) return false;
      }

      // Property type filter
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Bedrooms filter
      if (filters.beds) {
        const requiredBeds = parseInt(filters.beds);
        if (filters.beds === '5+') {
          if (property.beds < 5) return false;
        } else if (property.beds !== requiredBeds) {
          return false;
        }
      }

      // Bathrooms filter
      if (filters.baths) {
        const requiredBaths = parseInt(filters.baths);
        if (filters.baths === '4+') {
          if (property.baths < 4) return false;
        } else if (property.baths !== requiredBaths) {
          return false;
        }
      }

      return true;
    });

    // Sort by price
    const sortedProperties = [...filteredProperties].sort((a, b) => a.price - b.price);
    
    setSearchResults(sortedProperties);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setFilters({
      location: '',
      priceRange: '',
      propertyType: '',
      beds: '',
      baths: ''
    });
    setSearchResults([]);
  };

  return {
    searchResults,
    setSearchResults,
    isSearching,
    filters,
    handleFilterChange,
    handleSearch,
    clearSearch
  };
}; 