import React, { useState, useEffect } from 'react';
import { FiLoader, FiAlertCircle, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const LeadManager = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [user]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_leads')
        .select('*')
        .eq('agent_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const { error } = await supabase
        .from('agent_leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (err) {
      console.error('Error updating lead status:', err);
      alert('Failed to update lead status');
    }
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      const { error } = await supabase
        .from('agent_leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;
      setLeads(leads.filter(lead => lead.id !== leadId));
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-500';
      case 'contacted':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'qualified':
        return 'bg-purple-500/10 text-purple-500';
      case 'converted':
        return 'bg-green-500/10 text-green-500';
      case 'lost':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
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
      <h2 className="text-2xl font-bold text-white mb-6">
        Lead Management<span className="text-primary">.</span>
      </h2>

      {leads.length === 0 ? (
        <div className="text-center py-12 bg-dark-700 rounded-lg">
          <p className="text-gray-400">No leads found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-dark-600">
                <th className="pb-4 text-gray-400 font-medium">Name</th>
                <th className="pb-4 text-gray-400 font-medium">Contact</th>
                <th className="pb-4 text-gray-400 font-medium">Status</th>
                <th className="pb-4 text-gray-400 font-medium">Date</th>
                <th className="pb-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {leads.map((lead) => (
                <tr key={lead.id} className="text-white">
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      {lead.message && (
                        <p className="text-sm text-gray-400 mt-1">
                          {lead.message.substring(0, 50)}
                          {lead.message.length > 50 ? '...' : ''}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <p>{lead.email}</p>
                    {lead.phone && (
                      <p className="text-sm text-gray-400">{lead.phone}</p>
                    )}
                  </td>
                  <td className="py-4">
                    {editingLead === lead.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="bg-dark-600 border border-dark-500 rounded px-2 py-1 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                        <button
                          onClick={() => setEditingLead(null)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingLead(lead.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadManager; 