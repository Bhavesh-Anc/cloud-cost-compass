def get_optimization_tips(cost_data):
    """
    Generate optimization tips based on cost data
    """
    tips = []
    
    aws_cost = cost_data.get('aws', {}).get('total', 0)
    azure_cost = cost_data.get('azure', {}).get('total', 0)
    gcp_cost = cost_data.get('gcp', {}).get('total', 0)
    
    # Determine the cheapest provider
    cheapest = min(aws_cost, azure_cost, gcp_cost)
    
    if aws_cost == cheapest:
        tips.append("AWS appears to be the most cost-effective option for your workload.")
    elif azure_cost == cheapest:
        tips.append("Azure appears to be the most cost-effective option for your workload.")
    else:
        tips.append("GCP appears to be the most cost-effective option for your workload.")
    
    # Add provider-specific optimization tips
    if aws_cost > cheapest * 1.2:  # If AWS is more than 20% more expensive
        tips.append("Consider using AWS Reserved Instances for long-term workloads to save up to 40%.")
    
    if azure_cost > cheapest * 1.2:  # If Azure is more than 20% more expensive
        tips.append("Azure Hybrid Benefit could save you money if you have existing Windows Server licenses.")
    
    if gcp_cost > cheapest * 1.2:  # If GCP is more than 20% more expensive
        tips.append("GCP Sustained Use Discounts automatically apply when you use instances for a significant portion of the billing month.")
    
    # Add general optimization tips
    tips.extend([
        "Consider using spot/preemptible instances for fault-tolerant workloads to reduce compute costs.",
        "Implement auto-scaling to match resource allocation with demand.",
        "Use storage lifecycle policies to automatically move infrequently accessed data to cheaper storage tiers.",
        "Monitor and clean up unused resources regularly.",
        "Consider using CDN services to reduce bandwidth costs for content delivery."
    ])
    
    return tips