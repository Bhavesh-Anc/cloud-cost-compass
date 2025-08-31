import requests
import os
import json
from backend.middleware.cache import get_cached_response, cache_response

def get_gcp_prices():
    # Check cache first
    cached = get_cached_response("pricing:gcp")
    if cached:
        return cached
    
    # Use GCP Cloud Billing API
    API_KEY = os.getenv('GCP_API_KEY')
    PROJECT_ID = os.getenv('GCP_PROJECT_ID')
    
    if not API_KEY or not PROJECT_ID:
        # Fallback to static data if no API keys
        return load_static_data("gcp")
    
    url = f"https://cloudbilling.googleapis.com/v1/services/6F81-5844-456A/skus?key={API_KEY}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        # Process GCP pricing data (simplified)
        pricing_data = []
        for sku in data.get('skus', []):
            if 'compute' in sku.get('category', {}).get('serviceDisplayName', '').lower():
                for pricing_info in sku.get('pricingInfo', []):
                    price = pricing_info['pricingExpression']['tieredRates'][0]['unitPrice']['units']
                    region = sku.get('serviceRegions', ['global'])[0]
                    
                    pricing_data.append({
                        "service": "compute",
                        "instance": sku['description'],
                        "region": region,
                        "price": float(price) if price else 0.0
                    })
        
        # Cache the data
        cache_response("pricing:gcp", pricing_data)
        return pricing_data
        
    except Exception as e:
        print(f"Error fetching GCP prices: {e}")
        return load_static_data("gcp")

def load_static_data(provider):
    # Load from a static file if API fails
    with open(f'static_data/{provider}_prices.json') as f:
        return json.load(f)
