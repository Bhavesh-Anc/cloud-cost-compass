// Format currency values
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

// Format large numbers with commas
export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Calculate percentage difference
export const calculatePercentageDifference = (a, b) => {
  return ((a - b) / ((a + b) / 2)) * 100;
};

// Get the cheapest provider from cost data
export const getCheapestProvider = (costData) => {
  const providers = Object.entries(costData);
  return providers.reduce((cheapest, current) => 
    current[1].total < cheapest[1].total ? current : cheapest
  )[0];
};

// Generate a unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function for limiting API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate email format
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Format bytes to human-readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
