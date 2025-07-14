# API Documentation

This document provides information about the Swagger API documentation setup for the Backend Syndicate Restaurant POS System.

## Overview

The Backend Syndicate API is documented using Swagger/OpenAPI 3.0. The documentation includes comprehensive details about all endpoints, request/response schemas, authentication methods, and interactive testing capabilities.

## Accessing the API Documentation

### Development Environment
- **URL**: `http://localhost:2020/api-docs`
- **Prerequisites**: Start the development server with `pnpm dev`

### Production Environment
- **URL**: `https://backend-syndicate.onrender.com/api-docs`

## Features

### 🚀 Interactive API Testing
- Test all endpoints directly from the documentation interface
- Try out different request payloads and see real responses
- No need for external tools like Postman for basic testing

### 📋 Comprehensive Documentation
- **Complete endpoint coverage**: All current and planned endpoints are documented
- **Request/Response schemas**: Detailed TypeScript-based schemas for all data models
- **Authentication methods**: Both Bearer token and cookie-based authentication
- **Error handling**: Standardized error responses with proper HTTP status codes

### 🔐 Security Integration
- **Bearer Authentication**: JWT token-based authentication
- **Cookie Authentication**: Session-based authentication using better-auth
- **Security schemes**: Properly configured for all protected endpoints

## API Structure

### Base URL
- Development: `http://localhost:2020`
- Production: `https://backend-syndicate.onrender.com`

### API Versioning
All endpoints are versioned under `/api/v1/`

### Available Endpoints

#### Health Check
- `GET /health` - Server health status
- `GET /` - Root endpoint

#### Users Management
- `GET /api/v1/users/user-detail-table` - Get users with optional role filtering
- `PUT /api/v1/users/update-user` - Update user information

#### Customer Management
- `GET /api/v1/customers` - Get all customers
- `GET /api/v1/customers/get-customer/{id}` - Get customer by ID
- `POST /api/v1/customers/create-customer` - Create new customer (TODO)
- `PUT /api/v1/customers/update-customer` - Update customer information
- `DELETE /api/v1/customers/delete-customer` - Delete customer

## Data Models

### User Schema
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'MANAGER' | 'ORDER_MANAGER' | 'KITCHEN_MANAGER' | 'CUSTOMER';
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Customer Schema
```typescript
interface Customer {
  id: string;
  userId: string;
  preferredPaymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'WALLET' | 'NET_BANKING';
  isActive: boolean;
  isVip: boolean;
  customerSince: string;
  lastOrderDate?: string;
  totalOrdersCount: number;
  totalSpent: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
```

## Authentication

### Bearer Token Authentication
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:2020/api/v1/users/user-detail-table
```

### Cookie Authentication
The API supports session-based authentication through cookies managed by better-auth.

## Error Handling

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Development Notes

### Adding New Endpoints
When adding new endpoints to the API:

1. **Create the route handler** in the appropriate controller
2. **Add the route** to the relevant route file
3. **Document the endpoint** using JSDoc comments with Swagger annotations
4. **Update schemas** in `src/config/swagger.ts` if new data models are introduced

### JSDoc Swagger Format
```javascript
/**
 * @swagger
 * /api/v1/endpoint:
 *   get:
 *     tags:
 *       - Tag Name
 *     summary: Brief description
 *     description: Detailed description
 *     parameters:
 *       - in: query
 *         name: paramName
 *         schema:
 *           type: string
 *         description: Parameter description
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemaName'
 *     security:
 *       - bearerAuth: []
 */
```

## Useful Links

- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [JSDoc Swagger Documentation](https://swagger-jsdoc.github.io/docs/)
- [Better Auth Documentation](https://www.better-auth.com/)

## Support

For questions about the API documentation or to report issues:
- **GitHub Repository**: [Backend-Syndicate](https://github.com/AshutoshDM1/Backend-Syndicate)
- **Issues**: Create an issue in the GitHub repository 