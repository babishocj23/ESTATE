import { useState, useCallback } from 'react';
import { DEFAULT_FILTERS } from '../constants/filterOptions';

export const usePropertyFilters = (type = 'buy') => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filterProperties = useCallback((properties) => {
    // First filter the properties
    const filtered = properties.filter(property => {
      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          if (property.price < min || property.price > max) return false;
        } else {
          if (property.price < min) return false;
        }
      }

      // Bedrooms filter
      if (filters.beds && property.beds < parseInt(filters.beds)) {
        return false;
      }

      // Bathrooms filter
      if (filters.baths && property.baths < parseInt(filters.baths)) {
        return false;
      }

      // Property type filter - check if the selected type matches the property's specific type
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      return true;
    });

    // Then sort by price in ascending order
    return filtered.sort((a, b) => a.price - b.price);
  }, [filters]);

  return {
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    filterProperties
  };
}; 