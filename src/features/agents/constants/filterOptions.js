// Experience range options
export const EXPERIENCE_RANGES = [
  { value: '0-2', label: '0-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' }
];

// Specialties options
export const AGENT_SPECIALTIES = [
  { value: 'luxury', label: 'Luxury Homes' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'Residential' },
  { value: 'investment', label: 'Investment' },
  { value: 'waterfront', label: 'Waterfront' },
  { value: 'new-construction', label: 'New Construction' }
];

// Rating options
export const RATING_OPTIONS = [
  { value: '4.5', label: '4.5+' },
  { value: '4.0', label: '4.0+' },
  { value: '3.5', label: '3.5+' }
];

// Default filter states
export const DEFAULT_AGENT_FILTERS = {
  location: '',
  specialty: '',
  experience: '',
  rating: '',
  name: ''
}; 