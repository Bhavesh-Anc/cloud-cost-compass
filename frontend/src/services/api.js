import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`Received response from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export const calculateCost = async (calculationData) => {
  try {
    const response = await api.post('/api/calculate', calculationData);
    return response.data;
  } catch (error) {
    console.error('API Error calculating cost:', error);
    throw new Error(error.response?.data?.error || 'Failed to calculate costs');
  }
};

export const getOptimizationTips = async (costData) => {
  try {
    const response = await api.post('/api/optimize', { cost_data: costData });
    return response.data;
  } catch (error) {
    console.error('API Error getting optimization tips:', error);
    throw new Error(error.response?.data?.error || 'Failed to get optimization tips');
  }
};

export const getPricingData = async (provider) => {
  try {
    const response = await api.get(`/api/pricing/${provider}`);
    return response.data;
  } catch (error) {
    console.error('API Error getting pricing data:', error);
    throw new Error(error.response?.data?.error || 'Failed to get pricing data');
  }
};

export const generateReport = async (reportData) => {
  try {
    const response = await api.post('/api/report', reportData, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('API Error generating report:', error);
    throw new Error(error.response?.data?.error || 'Failed to generate report');
  }
};

export default api;
