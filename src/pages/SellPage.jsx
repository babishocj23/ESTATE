import React, { useState, useEffect } from 'react';
import { FiHome, FiDollarSign, FiMapPin, FiImage, FiPhone, FiMail, FiUser, FiCheck, FiMaximize, FiCalendar, FiTag, FiUsers, FiX, FiDroplet } from 'react-icons/fi';
import { BiBed, BiBath } from 'react-icons/bi';
import Hero from '../components/Hero';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Newsletter from '../components/Newsletter';

const SellPage = () => {
  const { user } = useAuth();
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
        setFormData(prev => ({ 
          ...prev, 
          ...draft,
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
        localStorage.setItem('propertyDraft', JSON.stringify(formData));
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error saving draft:', error);
      } finally {
        setSaving(false);
      }
    };

    const timeoutId = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section with Parallax Effect */}
      <div className="relative">
        <div 
          className="relative h-[400px] sm:h-[600px] bg-cover bg-center" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-900/50 to-dark-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80"></div>
          <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[2px]"></div>
          
          {/* Hero Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-32">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                List Your <span className="text-primary">Property</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-300 mb-4">
                Reach thousands of potential buyers and renters
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 pb-12">
          <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 border border-primary/10 transition-all duration-300">
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-primary">{Math.round((Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100)}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  {saving ? 'Saving...' : lastSaved ? `Last saved at ${lastSaved}` : ''}
                </div>
              </div>
              <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Listing Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'listingType', value: 'sell' } })}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  formData.listingType === 'sell'
                    ? 'border-primary bg-primary/10 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-primary/50'
                }`}
              >
                <FiTag className="w-5 h-5 mb-2 mx-auto" />
                <span className="block text-center text-sm">Sell Property</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'listingType', value: 'rent' } })}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  formData.listingType === 'rent'
                    ? 'border-primary bg-primary/10 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-primary/50'
                }`}
              >
                <FiCalendar className="w-5 h-5 mb-2 mx-auto" />
                <span className="block text-center text-sm">Rent Property</span>
              </button>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property Type
                    </label>
                    <div className="relative">
                      <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none text-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="villa">Villa</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1">
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
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-span-1 sm:col-span-2">
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
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="col-span-1">
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
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bathrooms
                    </label>
                    <div className="relative">
                      <FiDroplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="Number of bathrooms"
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Square Feet */}
                  <div className="col-span-1 sm:col-span-2">
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
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                ></textarea>
              </div>

              {/* Images */}
              <div>
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
                    className="flex items-center justify-center w-full px-4 py-4 bg-dark-800 rounded-xl border-2 border-dashed border-gray-600 cursor-pointer hover:border-primary transition-colors duration-300"
                  >
                    <div className="text-center">
                      <FiImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-400">Upload Images</span>
                    </div>
                  </label>
                </div>
                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image instanceof File ? URL.createObjectURL(image) : image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl"
                          onLoad={(e) => {
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
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
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
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
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
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit and Save Draft Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                <div className="text-sm text-gray-400 order-2 sm:order-1">
                  {saving ? 'Saving draft...' : lastSaved ? `Draft saved at ${lastSaved}` : ''}
                </div>
                <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, status: 'draft' }));
                      handleSubmit();
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 border border-primary/20 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary-600 text-white py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] text-sm font-medium"
                  >
                    List Property
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default SellPage; 