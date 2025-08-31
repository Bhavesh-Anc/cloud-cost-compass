import React, { useState } from 'react';
import { calculateCost } from '../services/api';
import './CalculatorForm.css';

const CalculatorForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    compute: { hours: 720, instances: 1, type: 'general' },
    storage: { size: 100, type: 'standard' },
    bandwidth: { amount: 50 }
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.compute.hours < 0 || formData.compute.hours > 8760) {
      newErrors.computeHours = "Hours must be between 0 and 8760 (1 year)";
    }
    
    if (formData.compute.instances < 1 || formData.compute.instances > 1000) {
      newErrors.computeInstances = "Instances must be between 1 and 1000";
    }
    
    if (formData.storage.size < 0 || formData.storage.size > 100000) {
      newErrors.storageSize = "Storage size must be between 0 and 100,000 GB";
    }
    
    if (formData.bandwidth.amount < 0 || formData.bandwidth.amount > 10000) {
      newErrors.bandwidth = "Bandwidth must be between 0 and 10,000 GB";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setApiError(null);
    
    try {
      const result = await calculateCost(formData);
      onCalculate(result);
    } catch (error) {
      console.error('Error calculating cost:', error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-form">
      <h2>Cloud Cost Calculator</h2>
      
      {apiError && (
        <div className="api-error">
          <h3>Error</h3>
          <p>{apiError}</p>
          <p>Please make sure the backend server is running on port 5000.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Compute Resources</h3>
          <div className="input-group">
            <label>
              Instance Hours (per month):
              <input
                type="number"
                value={formData.compute.hours}
                onChange={(e) => handleInputChange('compute', 'hours', parseInt(e.target.value) || 0)}
                min="0"
                max="8760"
                className={errors.computeHours ? 'error' : ''}
              />
              {errors.computeHours && <span className="error-text">{errors.computeHours}</span>}
            </label>
          </div>
          <div className="input-group">
            <label>
              Number of Instances:
              <input
                type="number"
                value={formData.compute.instances}
                onChange={(e) => handleInputChange('compute', 'instances', parseInt(e.target.value) || 1)}
                min="1"
                max="1000"
                className={errors.computeInstances ? 'error' : ''}
              />
              {errors.computeInstances && <span className="error-text">{errors.computeInstances}</span>}
            </label>
          </div>
          <div className="input-group">
            <label>
              Instance Type:
              <select
                value={formData.compute.type}
                onChange={(e) => handleInputChange('compute', 'type', e.target.value)}
              >
                <option value="general">General Purpose</option>
                <option value="compute">Compute Optimized</option>
                <option value="memory">Memory Optimized</option>
              </select>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Storage</h3>
          <div className="input-group">
            <label>
              Storage Size (GB):
              <input
                type="number"
                value={formData.storage.size}
                onChange={(e) => handleInputChange('storage', 'size', parseInt(e.target.value) || 0)}
                min="0"
                max="100000"
                className={errors.storageSize ? 'error' : ''}
              />
              {errors.storageSize && <span className="error-text">{errors.storageSize}</span>}
            </label>
          </div>
          <div className="input-group">
            <label>
              Storage Type:
              <select
                value={formData.storage.type}
                onChange={(e) => handleInputChange('storage', 'type', e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="ssd">SSD</option>
                <option value="archive">Archive</option>
              </select>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Bandwidth</h3>
          <div className="input-group">
            <label>
              Data Transfer (GB outbound):
              <input
                type="number"
                value={formData.bandwidth.amount}
                onChange={(e) => handleInputChange('bandwidth', 'amount', parseInt(e.target.value) || 0)}
                min="0"
                max="10000"
                className={errors.bandwidth ? 'error' : ''}
              />
              {errors.bandwidth && <span className="error-text">{errors.bandwidth}</span>}
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Costs'}
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;