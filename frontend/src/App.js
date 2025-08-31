import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import CostDashboard from './components/CostDashboard';
import OptimizationTips from './components/OptimizationTips';
import ProviderComparison from './components/ProviderComparison';
import ReportGenerator from './components/ReportGenerator';
import './App.css';

function App() {
  const [costData, setCostData] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleCostCalculation = (data) => {
    setCostData(data);
    setActiveTab('dashboard');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CloudCost Compass</h1>
        <nav>
          <button 
            className={activeTab === 'calculator' ? 'active' : ''} 
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
            disabled={!costData}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'comparison' ? 'active' : ''} 
            onClick={() => setActiveTab('comparison')}
            disabled={!costData}
          >
            Comparison
          </button>
          <button 
            className={activeTab === 'tips' ? 'active' : ''} 
            onClick={() => setActiveTab('tips')}
            disabled={!costData}
          >
            Optimization Tips
          </button>
          <button 
            className={activeTab === 'report' ? 'active' : ''} 
            onClick={() => setActiveTab('report')}
            disabled={!costData}
          >
            Generate Report
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'calculator' && (
          <CalculatorForm onCalculate={handleCostCalculation} />
        )}
        {activeTab === 'dashboard' && costData && (
          <CostDashboard data={costData} />
        )}
        {activeTab === 'comparison' && costData && (
          <ProviderComparison data={costData} />
        )}
        {activeTab === 'tips' && costData && (
          <OptimizationTips data={costData} />
        )}
        {activeTab === 'report' && costData && (
          <ReportGenerator data={costData} />
        )}
      </main>
    </div>
  );
}

export default App;
