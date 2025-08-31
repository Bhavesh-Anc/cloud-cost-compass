import os
import redis
import json
from datetime import timedelta

def get_redis_client():
    return redis.Redis.from_url(os.getenv('REDIS_URL'))

def cache_response(key, data, ttl=None):
    if not ttl:
        ttl = int(os.getenv('CACHE_TTL', 86400))
    
    redis_client = get_redis_client()
    redis_client.setex(key, timedelta(seconds=ttl), json.dumps(data))
    return data

def get_cached_response(key):
    redis_client = get_redis_client()
    cached = redis_client.get(key)
    return json.loads(cached) if cached else None

def generate_cache_key(provider, service, region):
    return f"pricing:{provider}:{service}:{region}"
