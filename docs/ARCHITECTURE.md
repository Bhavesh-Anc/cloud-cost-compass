# CloudCost Compass Architecture

## System Overview

CloudCost Compass is a web application that helps users compare cloud computing costs across AWS, Azure, and GCP. The system consists of a React frontend and a Flask backend with a modular architecture.

## Components

### Frontend (React)
- **CalculatorForm**: Input form for resource requirements
- **CostDashboard**: Visualization of cost breakdowns
- **ProviderComparison**: Side-by-side comparison of providers
- **OptimizationTips**: Cost-saving recommendations
- **ReportGenerator**: Report generation functionality

### Backend (Flask)
- **API Routes**: RESTful endpoints for calculations and data
- **Pricing Modules**: Provider-specific cost calculation logic
- **Core Utilities**: Common calculation and optimization functions
- **Middleware**: Caching and other cross-cutting concerns

### Data
- **Static Pricing Data**: JSON files with provider pricing information
- **Cache**: In-memory caching for improved performance

## Data Flow

1. User inputs resource requirements in the frontend
2. Frontend sends calculation request to backend API
3. Backend calculates costs for each provider using pricing modules
4. Results are returned to frontend and displayed in various visualizations
5. User can view optimization tips and generate reports

## Deployment

The application is containerized using Docker and can be deployed with Docker Compose. The frontend is served by Nginx, and the backend runs with Gunicorn.
