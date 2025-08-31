import React, { useState, useEffect } from 'react';
import { getOptimizationTips } from '../services/api';
import './OptimizationTips.css';

const OptimizationTips = ({ data }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const response = await getOptimizationTips(data);
        setTips(response.optimization_tips || []);
      } catch (error) {
        console.error('Error fetching optimization tips:', error);
        setTips([
          "Unable to load optimization tips. Please try again later.",
          "Consider using reserved instances for long-term workloads.",
          "Implement auto-scaling to match resource allocation with demand."
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [data]);

  if (loading) {
    return (
      <div className="optimization-tips">
        <h2>Optimization Tips</h2>
        <div className="loading">Loading optimization tips...</div>
      </div>
    );
  }

  return (
    <div className="optimization-tips">
      <h2>Optimization Tips</h2>
      
      <div className="tips-container">
        <div className="general-tips">
          <h3>General Cost Optimization Strategies</h3>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="provider-specific">
          <h3>Provider-Specific Recommendations</h3>
          
          <div className="provider-section">
            <h4>AWS</h4>
            <ul>
              <li>Use AWS Reserved Instances for predictable workloads to save up to 40%</li>
              <li>Consider Spot Instances for fault-tolerant workloads to save up to 70%</li>
              <li>Implement S3 Lifecycle Policies to automatically transition data to cheaper storage classes</li>
            </ul>
          </div>
          
          <div className="provider-section">
            <h4>Azure</h4>
            <ul>
              <li>Use Azure Reserved VM Instances for significant cost savings</li>
              <li>Consider Azure Spot VMs for batch processing and non-critical workloads</li>
              <li>Implement Azure Blob Storage tiering to optimize storage costs</li>
            </ul>
          </div>
          
          <div className="provider-section">
            <h4>GCP</h4>
            <ul>
              <li>Use Committed Use Discounts for predictable workloads</li>
              <li>Consider Preemptible VMs for fault-tolerant workloads</li>
              <li>Implement Cloud Storage classes to optimize storage costs based on access patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationTips;
