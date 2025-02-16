import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import PropertyFormModal from './PropertyFormModal';

const PropertyHub = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProperties(properties.filter(prop => prop.id !== id));
    } catch (err) {
      console.error('Error deleting property:', err);
      alert('Failed to delete property');
    }
  };

  const handleSave = (property) => {
    if (selectedProperty) {
      setProperties(properties.map(p => p.id === property.id ? property : p));
    } else {
      setProperties([property, ...properties]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          My Properties<span className="text-primary">.</span>
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-dark-700 rounded-lg">
          <p className="text-gray-400 mb-4">No properties found</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Add your first property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-dark-700 rounded-lg overflow-hidden hover:bg-dark-600 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={property.image || 'https://via.placeholder.com/300x200'}
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {property.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {property.location}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">
                    ${property.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowAddModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <PropertyFormModal
          property={selectedProperty}
          onClose={() => {
            setShowAddModal(false);
            setSelectedProperty(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PropertyHub; 