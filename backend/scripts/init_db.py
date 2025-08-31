#!/usr/bin/env python3
"""
Database initialization script for CloudCost Compass
This script would typically set up a database with pricing information
For now, it just validates the static data files
"""

import json
import os

def validate_json_files():
    """Validate all JSON pricing files"""
    data_dir = os.path.join(os.path.dirname(__file__), '../static_data')
    required_files = ['aws_prices.json', 'azure_prices.json', 'gcp_prices.json']
    
    for file_name in required_files:
        file_path = os.path.join(data_dir, file_name)
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
                print(f"✓ {file_name} is valid JSON")
                
                # Basic validation
                required_sections = ['compute', 'storage', 'bandwidth']
                for section in required_sections:
                    if section not in data:
                        print(f"✗ {file_name} missing section: {section}")
                        return False
                        
        except json.JSONDecodeError as e:
            print(f"✗ {file_name} contains invalid JSON: {e}")
            return False
        except FileNotFoundError:
            print(f"✗ {file_name} not found")
            return False
    
    return True

if __name__ == '__main__':
    print("Validating pricing data files...")
    if validate_json_files():
        print("All pricing files are valid!")
    else:
        print("Some pricing files are invalid!")
        exit(1)
