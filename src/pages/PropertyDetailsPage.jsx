import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiDroplet, FiMaximize, FiMapPin, FiCalendar, FiHome, FiDollarSign } from 'react-icons/fi';
import { properties } from '../data/properties';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  // Find property from our data
  const property = properties.find(p => p.id === parseInt(id)) || {
    title: "Luxury Modern Home",
    price: 750000,
    location: "123 Luxury Lane, Beverly Hills, CA",
    description: "This stunning modern home features an open concept living space, gourmet kitchen, and spectacular views. Perfect for entertaining and luxury living.",
    beds: 4,
    baths: 3,
    sqft: 2800,
    yearBuilt: 2020,
    propertyType: "Single Family Home",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"
    ],
    features: [
      "Gourmet Kitchen",
      "Smart Home Technology",
      "Swimming Pool",
      "Home Theater",
      "Wine Cellar",
      "3-Car Garage"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4">
            <img
              src={property.images?.[activeImage] || property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {property.images && (
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImage === index ? 'ring-4 ring-primary' : 'hover:opacity-80'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-dark-800 rounded-2xl p-6 mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
              <p className="text-gray-400 flex items-center gap-2 mb-4">
                <FiMapPin /> {property.location}
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <FiUser className="text-xl" />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FiDroplet className="text-xl" />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FiMaximize className="text-xl" />
                  <span>{property.sqft} sqft</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FiCalendar className="text-xl" />
                  <span>{property.yearBuilt}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                <p className="text-gray-300 leading-relaxed">{property.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <FiHome className="text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800 rounded-2xl p-6 sticky top-6">
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </span>
                {property.type === 'rent' && <span className="text-gray-400">/month</span>}
              </div>
              <div className="space-y-4">
                <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <FiDollarSign /> Schedule Viewing
                </button>
                <button className="w-full bg-dark-700 hover:bg-dark-600 text-white py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105">
                  Request Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage; 