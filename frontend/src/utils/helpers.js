// Format currency with commas
export const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
};

// Calculate savings percentage
export const calculateSavings = (original, optimized) => {
  return Math.round(((original - optimized) / original) * 100);
};

// Generate CSV content
export const generateCSV = (data) => {
  const headers = Object.keys(data).join(',');
  const values = Object.values(data).join(',');
  return `${headers}\n${values}`;
};

// Validate calculator inputs
export const validateInputs = (inputs) => {
  const errors = {};
  
  if (!inputs.provider) errors.provider = 'Provider is required';
  if (!inputs.service) errors.service = 'Service is required';
  if (!inputs.region) errors.region = 'Region is required';
  if (inputs.hours <= 0) errors.hours = 'Hours must be positive';
  if (inputs.quantity <= 0) errors.quantity = 'Quantity must be positive';
  
  return errors;
};
