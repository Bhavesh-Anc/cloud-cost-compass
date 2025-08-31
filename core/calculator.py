class CostCalculator:
    def __init__(self, provider):
        self.provider = provider
        self.price_data = self._load_price_data()
    
    def _load_price_data(self):
        # Connect to pricing API
        if self.provider == "aws":
            from api.aws_pricing import get_aws_prices
            return get_aws_prices()
        elif self.provider == "azure":
            from api.azure_pricing import get_azure_prices
            return get_azure_prices()
        elif self.provider == "gcp":
            from api.gcp_pricing import get_gcp_prices
            return get_gcp_prices()
    
    def calculate(self, service, region, hours, quantity):
        # Find matching price entry
        service_data = next(
            (item for item in self.price_data 
             if item["service"] == service 
             and item["region"] == region), 
            None
        )
        
        if not service_data:
            return {"error": "Service/region combination not found"}
        
        # Calculate total cost
        hourly_rate = service_data["price"]
        total_cost = hourly_rate * hours * quantity
        
        return {
            "provider": self.provider,
            "service": service,
            "region": region,
            "total_cost": round(total_cost, 2),
            "unit_price": hourly_rate
        }
