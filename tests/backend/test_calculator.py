import unittest
from backend.core.calculator import calculate_total_cost, calculate_monthly_cost, calculate_annual_cost

class TestCalculator(unittest.TestCase):
    def test_calculate_total_cost(self):
        cost_breakdown = {
            'compute': 100.0,
            'storage': 50.0,
            'bandwidth': 25.0
        }
        
        total = calculate_total_cost(cost_breakdown)
        self.assertEqual(total, 175.0)
    
    def test_calculate_monthly_cost(self):
        hourly_cost = 0.5
        monthly_cost = calculate_monthly_cost(hourly_cost)
        self.assertEqual(monthly_cost, 365.0)  # 0.5 * 730
    
    def test_calculate_annual_cost(self):
        monthly_cost = 100.0
        annual_cost = calculate_annual_cost(monthly_cost)
        self.assertEqual(annual_cost, 1200.0)

if __name__ == '__main__':
    unittest.main()
