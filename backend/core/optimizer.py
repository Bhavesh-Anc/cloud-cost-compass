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

def optimize_compute_costs(compute_usage, provider):
    """
    Generate compute-specific optimization recommendations
    """
    recommendations = []
    
    if compute_usage > 100:  # If using more than 100 hours
        recommendations.append(f"Consider using reserved instances on {provider} for committed use discounts.")
    
    if compute_usage > 500:  # If using more than 500 hours
        recommendations.append(f"Evaluate spot or preemptible instances on {provider} for fault-tolerant workloads.")
    
    return recommendations

def optimize_storage_costs(storage_size, storage_type, provider):
    """
    Generate storage-specific optimization recommendations
    """
    recommendations = []
    
    if storage_size > 1000:  # If storing more than 1TB
        recommendations.append(f"Consider implementing data tiering on {provider} to reduce storage costs.")
    
    if storage_type == 'standard' and storage_size > 500:
        recommendations.append(f"Evaluate moving infrequently accessed data to cooler storage tiers on {provider}.")
    
    return recommendations
