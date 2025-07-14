# Swagger Documentation Structure

This directory contains modular Swagger API documentation files for the Backend Syndicate Restaurant POS System. The documentation is organized by feature/domain for better maintainability and organization.

## 📁 File Structure

```
src/swagger/
├── README.md              # This documentation file
├── user.swagger.ts        # User management endpoints
├── customer.swagger.ts    # Customer management endpoints
└── health.swagger.ts      # Health check endpoints
```

## 🔧 Configuration

The main Swagger configuration is located at `src/config/swagger.ts`. This file:
- Sets up the OpenAPI specification
- Configures authentication schemes
- Defines common response schemas
- Points to individual swagger files for endpoint documentation

## 📚 Documentation Files

### `user.swagger.ts`
Contains documentation for all user-related endpoints:
- GET `/api/v1/users/user-detail-table` - Get users with role filtering
- PUT `/api/v1/users/update-user` - Update user information

**Schemas defined:**
- `User` - User model schema
- `UserListResponse` - Response schema for user list
- `UpdateUserRequest` - Request schema for user updates

### `customer.swagger.ts`
Contains documentation for all customer-related endpoints:
- GET `/api/v1/customers` - Get all customers
- GET `/api/v1/customers/get-customer/{id}` - Get customer by ID
- POST `/api/v1/customers/create-customer` - Create new customer (TODO)
- PUT `/api/v1/customers/update-customer` - Update customer
- DELETE `/api/v1/customers/delete-customer` - Delete customer

**Schemas defined:**
- `Customer` - Customer model schema
- `CustomerListResponse` - Response schema for customer list
- `CreateCustomerRequest` - Request schema for customer creation
- `UpdateCustomerRequest` - Request schema for customer updates
- `DeleteCustomerRequest` - Request schema for customer deletion

### `health.swagger.ts`
Contains documentation for health check endpoints:
- GET `/health` - Server health status
- GET `/` - Root endpoint

## 🚀 Adding New Documentation

When adding new API endpoints, follow these steps:

### 1. Create a New Swagger File (if needed)

If adding a new domain/feature (e.g., orders, menu, etc.), create a new file:

```typescript
// src/swagger/orders.swagger.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Order unique identifier
 *         # ... other properties
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     # ... rest of documentation
 */

export {};
```

### 2. Document Individual Endpoints

For each endpoint, include:
- **Tags**: Group related endpoints
- **Summary**: Brief description
- **Description**: Detailed explanation
- **Parameters**: Query, path, and header parameters
- **Request Body**: For POST/PUT/PATCH endpoints
- **Responses**: All possible response codes with examples
- **Security**: Required authentication

### 3. Define Schemas

Define reusable schemas in the `components.schemas` section:
- Request/Response models
- Shared data types
- Error schemas

### 4. Update Main Configuration

The main swagger config at `src/config/swagger.ts` automatically includes all files in the `src/swagger/` directory, so no changes are needed there.

## 📝 JSDoc Format

Use the following format for endpoint documentation:

```typescript
/**
 * @swagger
 * /api/v1/endpoint:
 *   method:
 *     tags:
 *       - Tag Name
 *     summary: Brief description
 *     description: Detailed description
 *     parameters:
 *       - in: query/path/header
 *         name: paramName
 *         required: true/false
 *         schema:
 *           type: string
 *         description: Parameter description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchemaName'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *     security:
 *       - bearerAuth: []
 */
```

## 🔗 Schema References

Use `$ref` to reference:
- Common schemas: `$ref: '#/components/schemas/SchemaName'`
- Common responses: `$ref: '#/components/responses/ResponseName'`

## 🎯 Best Practices

1. **Consistent Naming**: Use PascalCase for schema names
2. **Detailed Examples**: Provide realistic examples for all schemas
3. **Error Handling**: Document all possible error responses
4. **Security**: Include appropriate security requirements
5. **Descriptions**: Write clear, helpful descriptions
6. **Grouping**: Use logical tags to group related endpoints

## 🔄 Updating Documentation

When modifying existing endpoints:
1. Update the corresponding swagger file
2. Ensure examples match current API behavior
3. Update schema definitions if data models change
4. Test the documentation in the Swagger UI

## 📍 Accessing Documentation

- **Development**: `http://localhost:2020/api-docs`
- **Production**: `https://backend-syndicate.onrender.com/api-docs`

The documentation is automatically generated from these files and served through the Swagger UI interface. 