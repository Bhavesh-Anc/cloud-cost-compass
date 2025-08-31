import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
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
    
    let errorMessage = 'Network error. Please check your connection.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please make sure the backend is running.';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export const calculateCost = async (calculationData) => {
  try {
    const response = await api.post('/api/calculate', calculationData);
    return response.data;
  } catch (error) {
    console.error('API Error calculating cost:', error);
    throw new Error(error.message || 'Failed to calculate costs');
  }
};

export const getOptimizationTips = async (costData) => {
  try {
    const response = await api.post('/api/optimize', { cost_data: costData });
    return response.data;
  } catch (error) {
    console.error('API Error getting optimization tips:', error);
    throw new Error(error.message || 'Failed to get optimization tips');
  }
};

export const getPricingData = async (provider) => {
  try {
    const response = await api.get(`/api/pricing/${provider}`);
    return response.data;
  } catch (error) {
    console.error('API Error getting pricing data:', error);
    throw new Error(error.message || 'Failed to get pricing data');
  }
};

export default api;