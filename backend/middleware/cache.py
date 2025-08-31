from flask_caching import Cache

cache = Cache()

def setup_cache(app):
    """
    Configure caching for the application
    """
    app.config['CACHE_TYPE'] = 'simple'
    cache.init_app(app)