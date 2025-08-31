import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const calculateCost = async (config) => {
  try {
    const response = await axios.post(`${API_URL}/calculate`, config);
    return response.data;
  } catch (error) {
    console.error("Calculation error:", error);
    return { error: "Failed to calculate cost" };
  }
};

export const getOptimizationTips = async (config) => {
  try {
    const response = await axios.post(`${API_URL}/optimize`, config);
    return response.data;
  } catch (error) {
    console.error("Optimization error:", error);
    return { error: "Failed to get optimizations" };
  }
};
