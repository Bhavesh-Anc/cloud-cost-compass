from flask import Flask, request, jsonify
from core.calculator import CostCalculator
from core.optimizer import CostOptimizer

app = Flask(__name__)

@app.route('/api/calculate', methods=['POST'])
def calculate_cost():
    data = request.json
    calculator = CostCalculator(data['provider'])
    result = calculator.calculate(
        data['service'],
        data['region'],
        data['hours'],
        data['quantity']
    )
    return jsonify(result)

@app.route('/api/optimize', methods=['POST'])
def optimize_cost():
    data = request.json
    optimizer = CostOptimizer(data['current_config'])
    suggestions = optimizer.generate_suggestions()
    return jsonify(suggestions)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
