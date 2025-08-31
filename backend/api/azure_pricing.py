import requests
import os
import json
from backend.middleware.cache import get_cached_response, cache_response

def get_azure_prices():
    # Check cache first
    cached = get_cached_response("pricing:azure")
    if cached:
        return cached
    
    # Use Azure Retail Prices API
    AZURE_API_URL = "https://prices.azure.com/api/retail/prices"
    params = {
        '$filter': "serviceName eq 'Virtual Machines'",
        'api-version': '2021-10-01-preview'
    }
    
    try:
        response = requests.get(AZURE_API_URL, params=params)
        data = response.json()
        
        # Process Azure pricing data
        pricing_data = []
        for item in data.get('Items', []):
            if item['type'] == 'Consumption':
                pricing_data.append({
                    "service": "virtualMachines",
                    "instance": item['armSkuName'],
                    "region": item['armRegionName'],
                    "price": item['retailPrice']
                })
        
        # Cache the data
        cache_response("pricing:azure", pricing_data)
        return pricing_data
        
    except Exception as e:
        print(f"Error fetching Azure prices: {e}")
        return load_static_data("azure")

def load_static_data(provider):
    # Load from a static file if API fails
    with open(f'static_data/{provider}_prices.json') as f:
        return json.load(f)
