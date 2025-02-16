import React, { useState, useEffect } from 'react';
import { FiLoader, FiAlertCircle, FiPlus, FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Marketing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('campaigns');

  useEffect(() => {
    if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else {
      fetchMaterials();
    }
  }, [user, activeTab]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_campaigns')
        .select('*')
        .eq('agent_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_materials')
        .select('*')
        .eq('agent_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load marketing materials');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    try {
      const { error } = await supabase
        .from('agent_campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (err) {
      console.error('Error deleting campaign:', err);
      alert('Failed to delete campaign');
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;

    try {
      const { error } = await supabase
        .from('agent_materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMaterials(materials.filter(material => material.id !== id));
    } catch (err) {
      console.error('Error deleting material:', err);
      alert('Failed to delete material');
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
          Marketing<span className="text-primary">.</span>
        </h2>
        <button
          onClick={() => {/* TODO: Implement create modal */}}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          {activeTab === 'campaigns' ? 'New Campaign' : 'Upload Material'}
        </button>
      </div>

      <div className="bg-dark-700 rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-dark-600">
          <div className="flex">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'campaigns'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'materials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Marketing Materials
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'campaigns' ? (
            campaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No campaigns found</p>
                <button
                  onClick={() => {/* TODO: Implement create modal */}}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Create your first campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-dark-600 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {campaign.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400">
                          Status: {campaign.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          Budget: ${campaign.budget}
                        </span>
                        <span className="text-xs text-gray-400">
                          Start: {new Date(campaign.start_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {/* TODO: Implement edit modal */}}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            materials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No marketing materials found</p>
                <button
                  onClick={() => {/* TODO: Implement upload modal */}}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Upload your first material
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="bg-dark-600 rounded-lg overflow-hidden"
                  >
                    {material.type === 'image' && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={material.url}
                          alt={material.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-white mb-1">
                        {material.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {material.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {new Date(material.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={material.url}
                            download
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <FiDownload className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteMaterial(material.id)}
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketing; 