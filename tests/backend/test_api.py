import unittest
from backend.app import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_health_check(self):
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertIn('healthy', response.get_json()['status'])

    def test_calculate_endpoint(self):
        test_data = {
            "compute": {
                "hours": 720,
                "instances": 2,
                "type": "general"
            },
            "storage": {
                "size": 500,
                "type": "standard"
            },
            "bandwidth": {
                "amount": 200
            }
        }
        
        response = self.app.post('/api/calculate', json=test_data)
        self.assertEqual(response.status_code, 200)
        
        data = response.get_json()
        self.assertIn('aws', data)
        self.assertIn('azure', data)
        self.assertIn('gcp', data)
        
        # Check that all providers have the expected structure
        for provider in ['aws', 'azure', 'gcp']:
            self.assertIn('compute', data[provider])
            self.assertIn('storage', data[provider])
            self.assertIn('bandwidth', data[provider])
            self.assertIn('total', data[provider])

if __name__ == '__main__':
    unittest.main()
