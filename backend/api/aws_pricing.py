import json
import os

def load_aws_pricing():
    file_path = os.path.join(os.path.dirname(__file__), '../static_data/aws_prices.json')
    with open(file_path, 'r') as f:
        return json.load(f)

def calculate_aws_cost(resources):
    pricing_data = load_aws_pricing()
    
    compute_hours = resources.get('compute', {}).get('hours', 0)
    instances = resources.get('compute', {}).get('instances', 1)
    compute_type = resources.get('compute', {}).get('type', 'general')
    
    storage_size = resources.get('storage', {}).get('size', 0)
    storage_type = resources.get('storage', {}).get('type', 'standard')
    
    bandwidth = resources.get('bandwidth', {}).get('amount', 0)
    
    # Calculate compute cost
    compute_rate = pricing_data['compute'][compute_type]['hourly']
    compute_cost = compute_hours * instances * compute_rate
    
    # Calculate storage cost (monthly to hourly conversion)
    storage_rate = pricing_data['storage'][storage_type]['monthly'] / 730
    storage_cost = storage_size * storage_rate * compute_hours
    
    # Calculate bandwidth cost
    bandwidth_rate = pricing_data['bandwidth']['outbound']['rate']
    free_tier = pricing_data['bandwidth']['outbound']['free_tier']
    bandwidth_cost = max(0, bandwidth - free_tier) * bandwidth_rate
    
    return {
        'compute': compute_cost,
        'storage': storage_cost,
        'bandwidth': bandwidth_cost
    }
