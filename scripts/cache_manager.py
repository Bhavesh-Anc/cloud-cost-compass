#!/usr/bin/env python3
"""
Script to manage the application cache
This can be used to clear cached data when pricing updates occur
"""

import os
import shutil

def clear_cache():
    """Clear the application cache"""
    cache_dirs = [
        # Add paths to cache directories that need to be cleared
    ]
    
    for cache_dir in cache_dirs:
        if os.path.exists(cache_dir):
            shutil.rmtree(cache_dir)
            print(f"Cleared cache: {cache_dir}")
        else:
            print(f"Cache directory does not exist: {cache_dir}")
    
    print("Cache clearing completed.")

if __name__ == '__main__':
    clear_cache()
