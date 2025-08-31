import React from 'react';

const OptimizationTips = ({ data }) => {
  const getOptimizationTips = (providerData, provider) => {
    const tips = [];
    
    // Compute optimization tips
    if (providerData.compute > 50) {
      tips.push(`Consider using reserved instances for ${provider} to save up to 40% on compute costs.`);
    }
    
    if (providerData.compute > 100 && provider === 'aws') {
      tips.push('AWS Spot Instances could reduce your compute costs by up to 70% for fault-tolerant workloads.');
    }
    
    // Storage optimization tips
    if (providerData.storage > 100) {
      tips.push(`Evaluate moving infrequently accessed data to cold storage on ${provider} to reduce storage costs.`);
    }
    
    if (providerData.storage > 500) {
      tips.push(`Consider implementing data lifecycle policies on ${provider} to automatically transition data to cheaper storage tiers.`);
    }
    
    // Bandwidth optimization tips
    if (providerData.bandwidth > 50) {
      tips.push(`Use CDN services from ${provider} to reduce bandwidth costs and improve performance.`);
    }
    
    return tips;
  };

  const awsTips = getOptimizationTips(data.aws, 'AWS');
  const azureTips = getOptimizationTips(data.azure, 'Azure');
  const gcpTips = getOptimizationTips(data.gcp, 'GCP');

  return (
    <div className="optimization-tips">
      <h2>Optimization Tips</h2>
      
      <div className="provider-tips">
        <div className="tip-section">
          <h3>AWS Optimization Tips</h3>
          <ul>
            {awsTips.length > 0 ? (
              awsTips.map((tip, index) => <li key={index}>{tip}</li>)
            ) : (
              <li>Your AWS costs are already optimized for the current workload.</li>
            )}
          </ul>
        </div>
        
        <div className="tip-section">
          <h3>Azure Optimization Tips</h3>
          <ul>
            {azureTips.length > 0 ? (
              azureTips.map((tip, index) => <li key={index}>{tip}</li>)
            ) : (
              <li>Your Azure costs are already optimized for the current workload.</li>
            )}
          </ul>
        </div>
        
        <div className="tip-section">
          <h3>GCP Optimization Tips</h3>
          <ul>
            {gcpTips.length > 0 ? (
              gcpTips.map((tip, index) => <li key={index}>{tip}</li>)
            ) : (
              <li>Your GCP costs are already optimized for the current workload.</li>
            )}
          </ul>
        </div>
      </div>
      
      <div className="general-tips">
        <h3>General Cost Optimization Strategies</h3>
        <ul>
          <li>Regularly review and right-size your instances based on utilization metrics</li>
          <li>Implement auto-scaling to match workload demands</li>
          <li>Use heat maps to identify patterns and schedule non-production resources</li>
          <li>Leverage spot or preemptible instances for fault-tolerant workloads</li>
          <li>Implement tagging policies to track cost allocation</li>
          <li>Regularly delete unattached storage volumes and snapshots</li>
        </ul>
      </div>
    </div>
  );
};

export default OptimizationTips;
