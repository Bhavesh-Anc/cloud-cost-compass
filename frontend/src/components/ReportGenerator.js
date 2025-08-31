import React from 'react';
import { generateCSV } from '../utils/helpers';

export default function ReportGenerator({ data }) {
  const downloadCSV = () => {
    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cloud-cost-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="card">
      <h2>Report Generator</h2>
      <button onClick={downloadCSV}>Download CSV Report</button>
    </div>
  );
}
