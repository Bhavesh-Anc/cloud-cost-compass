import json
import os

# Load Azure pricing data
def load_azure_pricing():
    file_path = os.path.join(os.path.dirname(__file__), '../static_data/azure_prices.json')
    with open(file_path, 'r') as f:
        return json.load(f)

# Calculate Azure costs based on resource requirements
def calculate_azure_cost(resources):
    pricing_data = load_azure_pricing()
    
    compute_hours = resources.get('compute', {}).get('hours', 0)
    instances = resources.get('compute', {}).get('instances', 1)
    compute_type = resources.get('compute', {}).get('type', 'general')
    
    storage_size = resources.get('storage', {}).get('size', 0)
    storage_type = resources.get('storage', {}).get('type', 'standard')
    
    bandwidth = resources.get('bandwidth', {}).get('amount', 0)
    
    # Calculate compute cost
    compute_rate = pricing_data['compute'][compute_type]['hourly']
    compute_cost = compute_hours * instances * compute_rate
    
    # Calculate storage cost
    storage_rate = pricing_data['storage'][storage_type]['monthly']
    storage_cost = storage_size * storage_rate
    
    # Calculate bandwidth cost
    bandwidth_rate = pricing_data['bandwidth']['outbound']['rate']
    free_tier = pricing_data['bandwidth']['outbound']['free_tier']
    bandwidth_cost = max(0, bandwidth - free_tier) * bandwidth_rate
    
    return {
        'compute': compute_cost,
        'storage': storage_cost,
        'bandwidth': bandwidth_cost
    }
