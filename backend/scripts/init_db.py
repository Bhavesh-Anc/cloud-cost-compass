from backend.middleware.cache import get_redis_client
from backend.api import get_aws_prices, get_azure_prices, get_gcp_prices
import json

def seed_cache():
    redis_client = get_redis_client()
    
    print("Seeding AWS pricing data...")
    aws_data = get_aws_prices()
    redis_client.set("pricing:aws", json.dumps(aws_data))
    
    print("Seeding Azure pricing data...")
    azure_data = get_azure_prices()
    redis_client.set("pricing:azure", json.dumps(azure_data))
    
    print("Seeding GCP pricing data...")
    gcp_data = get_gcp_prices()
    redis_client.set("pricing:gcp", json.dumps(gcp_data))
    
    print("Cache seeding complete!")

if __name__ == "__main__":
    seed_cache()
