// Price range options for different property types
export const PRICE_RANGES = {
  buy: [
    { value: '0-500000', label: 'Under $500k' },
    { value: '500000-750000', label: '$500k - $750k' },
    { value: '750000-1000000', label: '$750k - $1M' },
    { value: '1000000-1500000', label: '$1M - $1.5M' },
    { value: '1500000-2000000', label: '$1.5M - $2M' },
    { value: '2000000+', label: 'Over $2M' }
  ],
  rent: [
    { value: '0-2000', label: 'Under $2,000' },
    { value: '2000-3000', label: '$2,000 - $3,000' },
    { value: '3000-4000', label: '$3,000 - $4,000' },
    { value: '4000-5000', label: '$4,000 - $5,000' },
    { value: '5000-7500', label: '$5,000 - $7,500' },
    { value: '7500+', label: 'Over $7,500' }
  ]
};

// Property types for different sections
export const PROPERTY_TYPES = {
  all: [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' }
  ],
  buy: [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' }
  ],
  rent: [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' }
  ]
};

// Bedroom options
export const BEDROOM_OPTIONS = [
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3 Bedrooms' },
  { value: '4', label: '4 Bedrooms' },
  { value: '5+', label: '5+ Bedrooms' }
];

// Bathroom options
export const BATHROOM_OPTIONS = [
  { value: '1', label: '1 Bathroom' },
  { value: '2', label: '2 Bathrooms' },
  { value: '3', label: '3 Bathrooms' },
  { value: '4+', label: '4+ Bathrooms' }
];

// Default filter states
export const DEFAULT_FILTERS = {
  location: '',
  propertyType: '',
  priceRange: '',
  beds: '',
  baths: ''
};

// Property display types
export const PROPERTY_DISPLAY_TYPES = {
  buy: 'For Sale',
  rent: 'For Rent',
  featured: 'Featured',
  offer: 'Special Offer'
};

// Price display formats
export const PRICE_DISPLAY = {
  buy: 'total',
  rent: 'monthly'
}; 