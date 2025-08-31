import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './CostDashboard.css';

const CostDashboard = ({ data }) => {
  const chartData = [
    { name: 'AWS', compute: data.aws.compute, storage: data.aws.storage, bandwidth: data.aws.bandwidth, total: data.aws.total },
    { name: 'Azure', compute: data.azure.compute, storage: data.azure.storage, bandwidth: data.azure.bandwidth, total: data.azure.total },
    { name: 'GCP', compute: data.gcp.compute, storage: data.gcp.storage, bandwidth: data.gcp.bandwidth, total: data.gcp.total }
  ];

  const pieData = [
    { name: 'Compute', value: data.aws.compute + data.azure.compute + data.gcp.compute },
    { name: 'Storage', value: data.aws.storage + data.azure.storage + data.gcp.storage },
    { name: 'Bandwidth', value: data.aws.bandwidth + data.azure.bandwidth + data.gcp.bandwidth }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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

      <div className="charts-container">
        <div className="chart">
          <h3>Cost Comparison by Provider</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']} />
              <Legend />
              <Bar dataKey="compute" fill="#8884d8" name="Compute" />
              <Bar dataKey="storage" fill="#82ca9d" name="Storage" />
              <Bar dataKey="bandwidth" fill="#ffc658" name="Bandwidth" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Total Costs by Provider</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Total Cost']} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Cost Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CostDashboard;
