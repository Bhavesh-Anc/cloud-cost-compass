import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import './ProviderComparison.css';

const ProviderComparison = ({ data }) => {
  const radarData = [
    { subject: 'Compute', AWS: data.aws.compute, Azure: data.azure.compute, GCP: data.gcp.compute, fullMark: Math.max(data.aws.compute, data.azure.compute, data.gcp.compute) * 1.2 },
    { subject: 'Storage', AWS: data.aws.storage, Azure: data.azure.storage, GCP: data.gcp.storage, fullMark: Math.max(data.aws.storage, data.azure.storage, data.gcp.storage) * 1.2 },
    { subject: 'Bandwidth', AWS: data.aws.bandwidth, Azure: data.azure.bandwidth, GCP: data.gcp.bandwidth, fullMark: Math.max(data.aws.bandwidth, data.azure.bandwidth, data.gcp.bandwidth) * 1.2 },
    { subject: 'Total', AWS: data.aws.total, Azure: data.azure.total, GCP: data.gcp.total, fullMark: Math.max(data.aws.total, data.azure.total, data.gcp.total) * 1.2 },
  ];

  const barData = [
    { name: 'AWS', compute: data.aws.compute, storage: data.aws.storage, bandwidth: data.aws.bandwidth, total: data.aws.total },
    { name: 'Azure', compute: data.azure.compute, storage: data.azure.storage, bandwidth: data.azure.bandwidth, total: data.azure.total },
    { name: 'GCP', compute: data.gcp.compute, storage: data.gcp.storage, bandwidth: data.gcp.bandwidth, total: data.gcp.total }
  ];

  // Find the cheapest provider
  const cheapestProvider = () => {
    const providers = [
      { name: 'AWS', total: data.aws.total },
      { name: 'Azure', total: data.azure.total },
      { name: 'GCP', total: data.gcp.total }
    ];
    
    return providers.reduce((cheapest, current) => 
      current.total < cheapest.total ? current : cheapest
    );
  };

  const cheapest = cheapestProvider();
  const mostExpensive = Math.max(data.aws.total, data.azure.total, data.gcp.total);
  const savingsPercentage = ((mostExpensive - cheapest.total) / mostExpensive) * 100;

  return (
    <div className="provider-comparison">
      <h2>Provider Comparison</h2>
      
      <div className="cheapest-provider">
        <h3>Most Cost-Effective Provider</h3>
        <div className="cheapest-card">
          <h4>{cheapest.name}</h4>
          <p className="cost">${cheapest.total.toFixed(2)}/month</p>
          <p>Estimated savings of {savingsPercentage.toFixed(1)}% compared to the most expensive option</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Cost Breakdown Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
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
          <h3>Provider Capabilities Radar Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="AWS" dataKey="AWS" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Azure" dataKey="Azure" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="GCP" dataKey="GCP" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="cost-differences">
        <h3>Cost Differences</h3>
        <table>
          <thead>
            <tr>
              <th>Comparison</th>
              <th>AWS vs Azure</th>
              <th>AWS vs GCP</th>
              <th>Azure vs GCP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compute Difference</td>
              <td>${Math.abs(data.aws.compute - data.azure.compute).toFixed(2)}</td>
              <td>${Math.abs(data.aws.compute - data.gcp.compute).toFixed(2)}</td>
              <td>${Math.abs(data.azure.compute - data.gcp.compute).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Storage Difference</td>
              <td>${Math.abs(data.aws.storage - data.azure.storage).toFixed(2)}</td>
              <td>${Math.abs(data.aws.storage - data.gcp.storage).toFixed(2)}</td>
              <td>${Math.abs(data.azure.storage - data.gcp.storage).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Bandwidth Difference</td>
              <td>${Math.abs(data.aws.bandwidth - data.azure.bandwidth).toFixed(2)}</td>
              <td>${Math.abs(data.aws.bandwidth - data.gcp.bandwidth).toFixed(2)}</td>
              <td>${Math.abs(data.azure.bandwidth - data.gcp.bandwidth).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Difference</td>
              <td>${Math.abs(data.aws.total - data.azure.total).toFixed(2)}</td>
              <td>${Math.abs(data.aws.total - data.gcp.total).toFixed(2)}</td>
              <td>${Math.abs(data.azure.total - data.gcp.total).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderComparison;
