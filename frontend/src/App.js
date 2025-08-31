import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import CostDashboard from './components/CostDashboard';
import OptimizationTips from './components/OptimizationTips';
import ReportGenerator from './components/ReportGenerator';
import ProviderComparison from './components/ProviderComparison';
import { calculateCost, getOptimizationTips } from './services/api';
import './index.css';

function App() {
  const [costData, setCostData] = useState(null);
  const [optimizationTips, setOptimizationTips] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  const handleCalculate = async (config) => {
    const result = await calculateCost(config);
    setCostData(result);
    
    const tips = await getOptimizationTips({
      current_config: config,
      current_cost: result.total_cost
    });
    setOptimizationTips(tips);
  };

  const handleCompare = async (configs) => {
    const results = await Promise.all(configs.map(calculateCost));
    setComparisonData(results);
  };

  return (
    <div className="app">
      <header>
        <h1>CloudCost Compass</h1>
        <p>Compare cloud costs across AWS, Azure, and GCP</p>
      </header>
      
      <main>
        <CalculatorForm 
          onCalculate={handleCalculate} 
          onCompare={handleCompare} 
        />
        
        {costData && <CostDashboard data={costData} />}
        
        {comparisonData.length > 0 && (
          <ProviderComparison data={comparisonData} />
        )}
        
        {optimizationTips.length > 0 && (
          <OptimizationTips tips={optimizationTips} />
        )}
        
        {costData && <ReportGenerator data={costData} />}
      </main>
      
      <footer>
        <p>CloudCost Compass &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
