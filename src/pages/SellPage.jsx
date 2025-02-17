import { useState, useEffect } from 'react';
import { FiHome, FiDollarSign, FiMapPin, FiImage, FiPhone, FiMail, FiUser, FiCheck, FiMaximize, FiCalendar, FiTag, FiUsers, FiX } from 'react-icons/fi';
import { BiBed, BiBath } from 'react-icons/bi';
import Hero from '../components/Hero';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const SellPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(0);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const [formData, setFormData] = useState({
    listingType: '',  // rent or sell
    propertyType: '',
    price: '',
    location: '',
    description: '',
    images: [], // This will store both File objects and image URLs
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    // Additional fields for better categorization
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    amenities: [],
    features: [],
    associatedAgents: [],
    availableFrom: '',
    status: 'draft',
    parkingSpaces: '',
    furnished: false,
    petsAllowed: false,
    propertyCondition: '',
    energyRating: '',
    tags: []
  });

  // Load draft from localStorage on initial load
  useEffect(() => {
    const savedDraft = localStorage.getItem('propertyDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Images from localStorage will be URLs, not File objects
        setFormData(prev => ({ 
          ...prev, 
          ...draft,
          // Keep only the image URLs from the draft
          images: draft.images.filter(img => typeof img === 'string')
        }));
      } catch (error) {
        console.error('Error parsing saved draft:', error);
      }
    }
  }, []);

  // Auto-save draft when form changes
  useEffect(() => {
    const saveDraft = async () => {
      setSaving(true);
      try {
        // Save to localStorage
        localStorage.setItem('propertyDraft', JSON.stringify(formData));
        
        // If user is logged in, also save to Supabase
        if (user) {
          const { error } = await supabase
            .from('property_drafts')
            .upsert({
              user_id: user.id,
              form_data: formData,
              last_updated: new Date().toISOString()
            });
          
          if (error) throw error;
        }
        
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error saving draft:', error);
      } finally {
        setSaving(false);
      }
    };

    // Debounce save to prevent too frequent updates
    const timeoutId = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  // Modified file input handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  // Form sections for better organization
  const sections = [
    {
      title: 'Basic Information',
      fields: ['listingType', 'propertyType', 'price', 'location']
    },
    {
      title: 'Property Details',
      fields: ['bedrooms', 'bathrooms', 'squareFeet', 'yearBuilt']
    },
    {
      title: 'Features & Amenities',
      fields: ['amenities', 'features', 'furnished', 'petsAllowed']
    },
    {
      title: 'Images & Description',
      fields: ['images', 'description']
    },
    {
      title: 'Contact Information',
      fields: ['name', 'email', 'phone']
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format")'
        }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-900/50 to-dark-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80"></div>
          <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[2px]"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-48">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                List Your <span className="text-primary">Property</span>
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Reach thousands of potential buyers.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-dark-900/40 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 border border-primary/10 transition-all duration-300">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-primary">{Math.round((Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100)}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  {saving ? 'Saving...' : lastSaved ? `Last saved at ${lastSaved}` : ''}
                </div>
              </div>
              <div className="h-2 bg-dark-800 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Listing Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'listingType', value: 'sell' } })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.listingType === 'sell'
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-gray-700 text-gray-400 hover:border-primary/50'
                  }`}
                >
                  <FiTag className="w-6 h-6 mb-2 mx-auto" />
                  <span className="block text-center">Sell Property</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'listingType', value: 'rent' } })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.listingType === 'rent'
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-gray-700 text-gray-400 hover:border-primary/50'
                  }`}
                >
                  <FiCalendar className="w-6 h-6 mb-2 mx-auto" />
                  <span className="block text-center">Rent Property</span>
                </button>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Type
                  </label>
                  <div className="relative">
                    <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="search-select"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {formData.listingType === 'rent' ? 'Monthly Rent' : 'Selling Price'}
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder={formData.listingType === 'rent' ? 'Enter monthly rent' : 'Enter price'}
                      className="search-input"
                      required
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <BiBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="Number of bedrooms"
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bathrooms
                  </label>
                  <div className="relative">
                    <BiBath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="Number of bathrooms"
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Square Feet */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Square Feet
                  </label>
                  <div className="relative">
                    <FiMaximize className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="squareFeet"
                      value={formData.squareFeet}
                      onChange={handleChange}
                      placeholder="Property size in sq ft"
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Year Built */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year Built
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      placeholder="Year of construction"
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter property location"
                      className="search-input"
                      required
                    />
                  </div>
                </div>

                {/* Associated Agents */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Associated Agents
                  </label>
                  <div className="relative">
                    <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="associatedAgents"
                      value={formData.associatedAgents.join(', ')}
                      onChange={(e) => {
                        const agentNames = e.target.value
                          .split(',')
                          .map(name => name.trim())
                          .filter(Boolean);
                        setFormData(prev => ({ ...prev, associatedAgents: agentNames }));
                      }}
                      placeholder="Enter agent names (comma-separated)"
                      className="search-input"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Enter agent names separated by commas (e.g., "John Smith, Jane Doe")
                  </p>
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amenities
                  </label>
                  <div className="relative">
                    <select
                      multiple
                      name="amenities"
                      value={formData.amenities}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData(prev => ({ ...prev, amenities: values }));
                      }}
                      className="search-select min-h-[120px] py-2"
                    >
                      {[
                        'Parking', 'Pool', 'Gym', 'Security',
                        'Elevator', 'Air Conditioning', 'Heating',
                        'Furnished', 'Pets Allowed', 'Storage',
                        'Garden', 'Balcony', 'Terrace', 'Smart Home',
                        'Solar Panels', 'EV Charging'
                      ].map(amenity => (
                        <option 
                          key={amenity} 
                          value={amenity}
                          className="py-1 px-2"
                        >
                          {amenity}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Hold Ctrl (Cmd on Mac) to select multiple amenities
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property"
                    rows="4"
                    className="search-input"
                    required
                  ></textarea>
                </div>

                {/* Images */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Images
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="images"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="images"
                      className="flex items-center justify-center w-full px-4 py-3 bg-dark-700 rounded-xl border-2 border-dashed border-gray-600 cursor-pointer hover:border-primary transition-colors duration-300"
                    >
                      <FiImage className="mr-2 text-gray-400" />
                      <span className="text-gray-400">Upload Images</span>
                    </label>
                  </div>
                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image instanceof File ? URL.createObjectURL(image) : image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                            onLoad={(e) => {
                              // Revoke the object URL after the image is loaded to free up memory
                              if (image instanceof File) {
                                URL.revokeObjectURL(e.target.src);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Information
                  </label>
                  <div className="space-y-4">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="search-input"
                        required
                      />
                    </div>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="search-input"
                        required
                      />
                    </div>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="search-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit and Save Draft Buttons */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {saving ? 'Saving draft...' : lastSaved ? `Draft saved at ${lastSaved}` : ''}
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, status: 'draft' }));
                      handleSubmit();
                    }}
                    className="px-6 py-3 border border-primary/20 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-600 text-white py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                  >
                    List Property
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage; 