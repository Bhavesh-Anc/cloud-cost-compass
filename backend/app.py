from flask import Flask, request, jsonify
from flask_cors import CORS
from api.aws_pricing import calculate_aws_cost
from api.azure_pricing import calculate_azure_cost
from api.gcp_pricing import calculate_gcp_cost
from core.calculator import calculate_total_cost
from core.optimizer import get_optimization_tips
from middleware.cache import cache
import os

app = Flask(__name__)
CORS(app)

# Configure caching
app.config['CACHE_TYPE'] = 'simple'
cache.init_app(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        
        # Calculate costs for each provider
        aws_cost = calculate_aws_cost(data)
        azure_cost = calculate_azure_cost(data)
        gcp_cost = calculate_gcp_cost(data)
        
        # Calculate totals
        aws_total = calculate_total_cost(aws_cost)
        azure_total = calculate_total_cost(azure_cost)
        gcp_total = calculate_total_cost(gcp_cost)
        
        response = {
            "aws": {
                "compute": aws_cost.get('compute', 0),
                "storage": aws_cost.get('storage', 0),
                "bandwidth": aws_cost.get('bandwidth', 0),
                "total": aws_total
            },
            "azure": {
                "compute": azure_cost.get('compute', 0),
                "storage": azure_cost.get('storage', 0),
                "bandwidth": azure_cost.get('bandwidth', 0),
                "total": azure_total
            },
            "gcp": {
                "compute": gcp_cost.get('compute', 0),
                "storage": gcp_cost.get('storage', 0),
                "bandwidth": gcp_cost.get('bandwidth', 0),
                "total": gcp_total
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/optimize', methods=['POST'])
def optimize():
    try:
        data = request.get_json()
        cost_data = data.get('cost_data', {})
        tips = get_optimization_tips(cost_data)
        return jsonify({"optimization_tips": tips})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/pricing/<provider>', methods=['GET'])
@cache.cached(timeout=3600)  # Cache for 1 hour
def get_pricing(provider):
    try:
        # This would typically fetch from a database or external API
        # For now, we'll return mock data
        if provider == 'aws':
            return jsonify({"message": "AWS pricing data", "source": "static"})
        elif provider == 'azure':
            return jsonify({"message": "Azure pricing data", "source": "static"})
        elif provider == 'gcp':
            return jsonify({"message": "GCP pricing data", "source": "static"})
        else:
            return jsonify({"error": "Invalid provider"}), 400
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('FLASK_ENV') == 'development')
