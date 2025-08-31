import unittest
from backend.core.calculator import CostCalculator

class TestCostCalculator(unittest.TestCase):
    def test_aws_calculation(self):
        calculator = CostCalculator("aws")
        # Mock data
        calculator.price_data = [
            {"service": "ec2", "region": "us-east-1", "instance": "t3.micro", "price": 0.0116}
        ]
        result = calculator.calculate("ec2", "us-east-1", 720, 1)
        self.assertEqual(result['total_cost'], 0.0116 * 720)

    def test_azure_calculation(self):
        calculator = CostCalculator("azure")
        calculator.price_data = [
            {"service": "virtualMachines", "region": "eastus", "instance": "B1ls", "price": 0.005}
        ]
        result = calculator.calculate("virtualMachines", "eastus", 720, 1)
        self.assertEqual(result['total_cost'], 0.005 * 720)

    def test_gcp_calculation(self):
        calculator = CostCalculator("gcp")
        calculator.price_data = [
            {"service": "compute", "region": "us-east1", "instance": "e2-micro", "price": 0.0076}
        ]
        result = calculator.calculate("compute", "us-east1", 720, 1)
        self.assertEqual(result['total_cost'], 0.0076 * 720)

    def test_service_not_found(self):
        calculator = CostCalculator("aws")
        calculator.price_data = []
        result = calculator.calculate("ec2", "us-east-1", 720, 1)
        self.assertIn("error", result)

if __name__ == "__main__":
    unittest.main()
