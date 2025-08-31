# CloudCost Compass API Reference

## Base URL
All API endpoints are relative to `http://localhost:5000` or your deployment URL.

## Endpoints

### POST /api/calculate
Calculate costs for specified resources across cloud providers.

**Request Body:**
```json
{
  "compute": {
    "hours": 720,
    "instances": 2,
    "type": "general"
  },
  "storage": {
    "size": 500,
    "type": "standard"
  },
  "bandwidth": {
    "amount": 200
  }
}
