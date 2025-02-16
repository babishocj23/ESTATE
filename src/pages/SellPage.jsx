import { useState } from 'react';
import { FiHome, FiDollarSign, FiMapPin, FiImage, FiPhone, FiMail } from 'react-icons/fi';
import Hero from '../components/Hero';

const SellPage = () => {
  const [formData, setFormData] = useState({
    propertyType: '',
    price: '',
    location: '',
    description: '',
    images: [],
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Hero 
        title="Sell Your Property"
        subtitle="List your property and reach thousands of potential buyers"
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format"
        size="small"
        priority={true}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32 relative z-10">
        <div className="bg-dark-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
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
                    className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white appearance-none"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                    required
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
                    className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                    required
                  />
                </div>
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
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                  required
                />
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
                  />
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center w-full px-4 py-3 bg-dark-700 rounded-xl border-2 border-dashed border-gray-600 cursor-pointer hover:border-primary transition-colors duration-300"
                  >
                    <FiImage className="mr-2 text-gray-400" />
                    <span className="text-gray-400">Upload Images</span>
                  </label>
                </div>
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full pl-10 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
              >
                List Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage; 