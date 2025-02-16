import { useState, useEffect } from 'react';
import { FiLoader, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const ShopManager = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('shop_items')
          .select('*')
          .eq('agent_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching shop items:', err);
        setError('Failed to load shop items');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchShopItems();
    }
  }, [user]);

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('shop_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setItems(items.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item');
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
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Shop Items</h2>
        <button
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          onClick={() => {/* TODO: Implement item creation */}}
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-dark-700 rounded-lg">
          <p className="text-gray-400 mb-4">No items in your shop</p>
          <button
            className="text-primary hover:text-primary-dark transition-colors"
            onClick={() => {/* TODO: Implement item creation */}}
          >
            Add your first item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-dark-700 rounded-lg overflow-hidden hover:bg-dark-600 transition-colors"
            >
              {item.image_url && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">
                    ${item.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => {/* TODO: Implement item editing */}}
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopManager; 