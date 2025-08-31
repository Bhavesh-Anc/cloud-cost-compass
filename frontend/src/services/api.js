import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculateCost = async (calculationData) => {
  try {
    const response = await api.post('/api/calculate', calculationData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getPricingData = async (provider) => {
  try {
    const response = await api.get(`/api/pricing/${provider}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const generateReport = async (reportData) => {
  try {
    const response = await api.post('/api/report', reportData, {
      responseType: 'blob' // For file downloads
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;
