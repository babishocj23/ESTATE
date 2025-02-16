import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const agentService = {
  // Get all agents
  async getAgents() {
    try {
      const response = await axios.get(`${API_URL}/agents`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get agent by ID
  async getAgentById(id) {
    try {
      const response = await axios.get(`${API_URL}/agents/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
}; 