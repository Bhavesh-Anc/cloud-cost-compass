import React from 'react';

export default function OptimizationTips({ tips }) {
  if (!tips || tips.length === 0) return null;
  
  return (
    <div className="card">
      <h2>Optimization Suggestions</h2>
      
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <h3>{tip.type.replace(/_/g, ' ').toUpperCase()}</h3>
            <p>{tip.description}</p>
            <div className="savings-badge">
              Save up to {tip.savings}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
