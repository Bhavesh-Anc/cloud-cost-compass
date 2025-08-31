def calculate_total_cost(cost_breakdown):
    """
    Calculate the total cost from a cost breakdown dictionary
    """
    return sum(cost_breakdown.values())

def calculate_monthly_cost(hourly_cost, hours_per_month=730):
    """
    Convert hourly cost to monthly cost
    """
    return hourly_cost * hours_per_month

def calculate_annual_cost(monthly_cost):
    """
    Convert monthly cost to annual cost
    """
    return monthly_cost * 12

def calculate_savings_percentage(original_cost, new_cost):
    """
    Calculate the percentage savings between two costs
    """
    if original_cost == 0:
        return 0
    return ((original_cost - new_cost) / original_cost) * 100