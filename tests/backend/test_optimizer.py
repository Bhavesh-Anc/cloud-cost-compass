import unittest
from backend.core.optimizer import get_optimization_tips, optimize_compute_costs, optimize_storage_costs

class TestOptimizer(unittest.TestCase):
    def test_get_optimization_tips(self):
        cost_data = {
            'aws': {'total': 100.0},
            'azure': {'total': 120.0},
            'gcp': {'total': 90.0}
        }
        
        tips = get_optimization_tips(cost_data)
        self.assertIsInstance(tips, list)
        self.assertGreater(len(tips), 0)
        self.assertIn('GCP', tips[0])  # Should recommend GCP as cheapest
    
    def test_optimize_compute_costs(self):
        recommendations = optimize_compute_costs(200, 'AWS')
        self.assertIsInstance(recommendations, list)
        self.assertGreater(len(recommendations), 0)
    
    def test_optimize_storage_costs(self):
        recommendations = optimize_storage_costs(1500, 'standard', 'AWS')
        self.assertIsInstance(recommendations, list)
        self.assertGreater(len(recommendations), 0)

if __name__ == '__main__':
    unittest.main()
