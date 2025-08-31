import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CostDashboard = ({ data }) => {
  const chartData = [
    { name: 'AWS', compute: data.aws.compute, storage: data.aws.storage, bandwidth: data.aws.bandwidth, total: data.aws.total },
    { name: 'Azure', compute: data.azure.compute, storage: data.azure.storage, bandwidth: data.azure.bandwidth, total: data.azure.total },
    { name: 'GCP', compute: data.gcp.compute, storage: data.gcp.storage, bandwidth: data.gcp.bandwidth, total: data.gcp.total }
  ];

  return (
    <div className="cost-dashboard">
      <h2>Cost Dashboard</h2>
      
      <div className="summary-cards">
        <div className="card aws">
          <h3>AWS</h3>
          <p className="cost">${data.aws.total.toFixed(2)}</p>
          <div className="breakdown">
            <p>Compute: ${data.aws.compute.toFixed(2)}</p>
            <p>Storage: ${data.aws.storage.toFixed(2)}</p>
            <p>Bandwidth: ${data.aws.bandwidth.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="card azure">
          <h3>Azure</h3>
          <p className="cost">${data.azure.total.toFixed(2)}</p>
          <div className="breakdown">
            <p>Compute: ${data.azure.compute.toFixed(2)}</p>
            <p>Storage: ${data.azure.storage.toFixed(2)}</p>
            <p>Bandwidth: ${data.azure.bandwidth.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="card gcp">
          <h3>GCP</h3>
          <p className="cost">${data.gcp.total.toFixed(2)}</p>
          <div className="breakdown">
            <p>Compute: ${data.gcp.compute.toFixed(2)}</p>
            <p>Storage: ${data.gcp.storage.toFixed(2)}</p>
            <p>Bandwidth: ${data.gcp.bandwidth.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Cost Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="compute" fill="#8884d8" name="Compute" />
            <Bar dataKey="storage" fill="#82ca9d" name="Storage" />
            <Bar dataKey="bandwidth" fill="#ffc658" name="Bandwidth" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Total Costs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total Cost" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostDashboard;
