import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProviderComparison({ data }) {
  const providers = data.map(item => item.provider.toUpperCase());
  const costs = data.map(item => item.total_cost);
  
  const chartData = {
    labels: providers,
    datasets: [
      {
        label: 'Total Cost ($)',
        data: costs,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cloud Cost Comparison',
        font: {
          size: 18
        }
      }
    }
  };

  return (
    <div className="card">
      <h2>Provider Comparison</h2>
      <div style={{ height: '400px', marginTop: '20px' }}>
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="comparison-table" style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Service</th>
              <th>Region</th>
              <th>Unit Price ($/hr)</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.provider.toUpperCase()}</td>
                <td>{item.service}</td>
                <td>{item.region}</td>
                <td>${item.unit_price.toFixed(4)}</td>
                <td>${item.total_cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
