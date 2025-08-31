import React, { useState } from 'react';

const ReportGenerator = ({ data }) => {
  const [reportFormat, setReportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [email, setEmail] = useState('');

  const generateReport = () => {
    // In a real application, this would call an API endpoint to generate the report
    alert(`Generating ${reportFormat} report with${includeCharts ? '' : 'out'} charts. ${email ? `Will be sent to ${email}` : ''}`);
    
    // Simulate report download
    const reportData = {
      generatedAt: new Date().toISOString(),
      parameters: {}, // Would include the original calculation parameters
      results: data,
      summary: {
        cheapestProvider: Object.entries(data).reduce((a, b) => a[1].total < b[1].total ? a : b)[0],
        totalCostRange: {
          min: Math.min(data.aws.total, data.azure.total, data.gcp.total),
          max: Math.max(data.aws.total, data.azure.total, data.gcp.total)
        }
      }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `cloud-cost-report-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="report-generator">
      <h2>Generate Cost Report</h2>
      
      <div className="report-options">
        <div className="option-group">
          <label>
            Report Format:
            <select value={reportFormat} onChange={(e) => setReportFormat(e.target.value)}>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="json">JSON</option>
            </select>
          </label>
        </div>
        
        <div className="option-group">
          <label>
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
            />
            Include Charts
          </label>
        </div>
        
        <div className="option-group">
          <label>
            Email Report (optional):
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </label>
        </div>
      </div>
      
      <div className="report-preview">
        <h3>Report Preview</h3>
        <div className="preview-content">
          <h4>Cloud Cost Comparison Report</h4>
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Compute</th>
                <th>Storage</th>
                <th>Bandwidth</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AWS</td>
                <td>${data.aws.compute.toFixed(2)}</td>
                <td>${data.aws.storage.toFixed(2)}</td>
                <td>${data.aws.bandwidth.toFixed(2)}</td>
                <td>${data.aws.total.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Azure</td>
                <td>${data.azure.compute.toFixed(2)}</td>
                <td>${data.azure.storage.toFixed(2)}</td>
                <td>${data.azure.bandwidth.toFixed(2)}</td>
                <td>${data.azure.total.toFixed(2)}</td>
              </tr>
              <tr>
                <td>GCP</td>
                <td>${data.gcp.compute.toFixed(2)}</td>
                <td>${data.gcp.storage.toFixed(2)}</td>
                <td>${data.gcp.bandwidth.toFixed(2)}</td>
                <td>${data.gcp.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <p><strong>Recommendation:</strong> Based on your requirements, {
            Object.entries(data).reduce((a, b) => a[1].total < b[1].total ? a : b)[0]
          } appears to be the most cost-effective option.</p>
        </div>
      </div>
      
      <button onClick={generateReport} className="generate-btn">
        Generate Report
      </button>
    </div>
  );
};

export default ReportGenerator;
