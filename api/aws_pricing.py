import requests
import os

def get_aws_prices():
    # Use AWS Price List API
    AWS_API_URL = "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/index.json"
    
    try:
        response = requests.get(AWS_API_URL)
        data = response.json()
        
        # Extract relevant pricing data
        simplified_data = []
        for sku, details in data["products"].items():
            if details.get("productFamily") == "Compute Instance":
                entry = {
                    "service": "ec2",
                    "instance": details["attributes"]["instanceType"],
                    "region": details["attributes"]["regionCode"],
                    "price": float(data["terms"]["OnDemand"][sku]["priceDimensions"].values()[0]["pricePerUnit"]["USD"])
                }
                simplified_data.append(entry)
        return simplified_data
        
    except Exception as e:
        # Fallback to cached data
        return load_cached_data("aws")
