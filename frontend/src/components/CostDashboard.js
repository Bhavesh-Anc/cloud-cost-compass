import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { formatCurrency } from '../utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CostDashboard({ data }) {
  if (!data) return null;
  
  const chartData = {
    labels: ['Compute', 'Storage', 'Networking'],
    datasets: [
      {
        data: [data.total_cost * 0.7, data.total_cost * 0.2, data.total_cost * 0.1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div className="card">
      <h2>Cost Breakdown</h2>
      
      <div className="cost-summary">
        <div className="summary-item">
          <span className="label">Provider:</span>
          <span className="value">{data.provider.toUpperCase()}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Cost:</span>
          <span className="value">{formatCurrency(data.total_cost)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Unit Price:</span>
          <span className="value">{formatCurrency(data.unit_price)}/hr</span>
        </div>
      </div>
      
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}
