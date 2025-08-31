import React, { useState } from 'react';
import { calculateCost } from '../services/api';

const CalculatorForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    compute: { hours: 0, instances: 0, type: 'general' },
    storage: { size: 0, type: 'standard' },
    bandwidth: { amount: 0 }
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await calculateCost(formData);
      onCalculate(result);
    } catch (error) {
      console.error('Error calculating cost:', error);
      alert('Failed to calculate costs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-form">
      <h2>Cloud Cost Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Compute Resources</h3>
          <div className="input-group">
            <label>
              Instance Hours:
              <input
                type="number"
                value={formData.compute.hours}
                onChange={(e) => handleInputChange('compute', 'hours', parseInt(e.target.value))}
                min="0"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Number of Instances:
              <input
                type="number"
                value={formData.compute.instances}
                onChange={(e) => handleInputChange('compute', 'instances', parseInt(e.target.value))}
                min="0"
              />
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
                onChange={(e) => handleInputChange('storage', 'size', parseInt(e.target.value))}
                min="0"
              />
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
              Data Transfer (GB):
              <input
                type="number"
                value={formData.bandwidth.amount}
                onChange={(e) => handleInputChange('bandwidth', 'amount', parseInt(e.target.value))}
                min="0"
              />
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
