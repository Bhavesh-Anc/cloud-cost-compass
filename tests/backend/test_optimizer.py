import unittest
from backend.core.optimizer import CostOptimizer

class TestCostOptimizer(unittest.TestCase):
    def test_reserved_instance_suggestion(self):
        # Long running instance should get RI suggestion
        config = {
            "provider": "aws",
            "service": "ec2",
            "region": "us-east-1",
            "hours": 8000,  # ~1 year
            "quantity": 1
        }
        optimizer = CostOptimizer(config)
        suggestions = optimizer.generate_suggestions()
        self.assertTrue(any(s['type'] == 'reserved_instance' for s in suggestions))

    def test_region_change_suggestion(self):
        # If current region is not the cheapest, suggest change
        config = {
            "provider": "aws",
            "service": "ec2",
            "region": "us-west-1",  # Assuming this is more expensive
            "hours": 720,
            "quantity": 1
        }
        optimizer = CostOptimizer(config)
        # Mock region prices
        optimizer.region_prices = {
            "us-east-1": 0.01,
            "us-west-1": 0.02
        }
        suggestions = optimizer.generate_suggestions()
        self.assertTrue(any(s['type'] == 'region_change' for s in suggestions))
        self.assertEqual(suggestions[0]['recommended_region'], 'us-east-1')

if __name__ == "__main__":
    unittest.main()
