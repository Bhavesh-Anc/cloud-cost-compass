class CostOptimizer:
    def __init__(self, current_config):
        self.config = current_config
    
    def generate_suggestions(self):
        suggestions = []
        
        # Reserved instance suggestion
        if self.config["hours"] > 730:  # >1 month
            suggestions.append({
                "type": "reserved_instance",
                "savings": f"Up to {self.calculate_ri_savings()}%",
                "description": "Use reserved instances for long-term workloads"
            })
        
        # Region optimization
        cheapest_region = self.find_cheapest_region()
        if cheapest_region != self.config["region"]:
            suggestions.append({
                "type": "region_change",
                "savings": f"~{self.calculate_region_savings(cheapest_region)}%",
                "description": f"Switch to {cheapest_region} region"
            })
        
        return suggestions
    
    def calculate_ri_savings(self):
        # Simplified calculation
        return 40  # Average savings percentage
    
    def find_cheapest_region(self):
        # Implementation would fetch comparative pricing
        return "us-east-1"  # Example
