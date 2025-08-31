from flask import Flask, request, jsonify
from flask_cors import CORS
from api.aws_pricing import calculate_aws_cost
from api.azure_pricing import calculate_azure_cost
from api.gcp_pricing import calculate_gcp_cost
from core.calculator import calculate_total_cost
from core.optimizer import get_optimization_tips
from middleware.cache import cache
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configure caching
app.config['CACHE_TYPE'] = 'simple'
cache.init_app(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "cloudcost-compass"})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        logger.info(f"Calculation request received: {data}")
        
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
                "compute": round(aws_cost.get('compute', 0), 2),
                "storage": round(aws_cost.get('storage', 0), 2),
                "bandwidth": round(aws_cost.get('bandwidth', 0), 2),
                "total": round(aws_total, 2)
            },
            "azure": {
                "compute": round(azure_cost.get('compute', 0), 2),
                "storage": round(azure_cost.get('storage', 0), 2),
                "bandwidth": round(azure_cost.get('bandwidth', 0), 2),
                "total": round(azure_total, 2)
            },
            "gcp": {
                "compute": round(gcp_cost.get('compute', 0), 2),
                "storage": round(gcp_cost.get('storage', 0), 2),
                "bandwidth": round(gcp_cost.get('bandwidth', 0), 2),
                "total": round(gcp_total, 2)
            }
        }
        
        logger.info(f"Calculation completed: {response}")
        return jsonify(response)
    
    except Exception as e:
        logger.error(f"Calculation error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/optimize', methods=['POST'])
def optimize():
    try:
        data = request.get_json()
        cost_data = data.get('cost_data', {})
        tips = get_optimization_tips(cost_data)
        return jsonify({"optimization_tips": tips})
    
    except Exception as e:
        logger.error(f"Optimization error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/pricing/<provider>', methods=['GET'])
@cache.cached(timeout=3600)  # Cache for 1 hour
def get_pricing(provider):
    try:
        if provider == 'aws':
            from api.aws_pricing import load_aws_pricing
            return jsonify(load_aws_pricing())
        elif provider == 'azure':
            from api.azure_pricing import load_azure_pricing
            return jsonify(load_azure_pricing())
        elif provider == 'gcp':
            from api.gcp_pricing import load_gcp_pricing
            return jsonify(load_gcp_pricing())
        else:
            return jsonify({"error": "Invalid provider"}), 400
    
    except Exception as e:
        logger.error(f"Pricing error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('FLASK_ENV') == 'development')
