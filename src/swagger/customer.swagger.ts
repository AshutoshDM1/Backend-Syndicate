/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get all customers
 *     description: Retrieve all customers in the system
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerListResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/customers/get-customer/{id}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get customer by ID
 *     description: Retrieve a specific customer by their unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Customer unique identifier
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     customer:
 *                       $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               message: "Customer fetched successfully"
 *               customer:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 userId: "456e7890-e89b-12d3-a456-426614174000"
 *                 preferredPaymentMethod: "CREDIT_CARD"
 *                 isActive: true
 *                 isVip: false
 *                 customerSince: "2024-01-01T00:00:00Z"
 *                 lastOrderDate: "2024-01-15T00:00:00Z"
 *                 totalOrdersCount: 5
 *                 totalSpent: 250.50
 *                 emailNotifications: true
 *                 smsNotifications: true
 *                 pushNotifications: false
 *                 createdAt: "2024-01-01T00:00:00Z"
 *                 updatedAt: "2024-01-01T00:00:00Z"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/customers/create-customer:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Create a new customer
 *     description: Create a new customer account (TODO - implementation pending)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerRequest'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     customer:
 *                       $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               message: "Customer created successfully"
 *               customer:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 userId: "456e7890-e89b-12d3-a456-426614174000"
 *                 preferredPaymentMethod: "CREDIT_CARD"
 *                 isActive: true
 *                 isVip: false
 *                 customerSince: "2024-01-01T00:00:00Z"
 *                 lastOrderDate: null
 *                 totalOrdersCount: 0
 *                 totalSpent: 0
 *                 emailNotifications: true
 *                 smsNotifications: true
 *                 pushNotifications: false
 *                 createdAt: "2024-01-01T00:00:00Z"
 *                 updatedAt: "2024-01-01T00:00:00Z"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: Customer already exists for this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Conflict"
 *               error: "Customer already exists for this user"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/customers/update-customer:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Update customer information
 *     description: Update customer preferences and settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerRequest'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     customer:
 *                       $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               message: "Customer updated successfully"
 *               customer:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 userId: "456e7890-e89b-12d3-a456-426614174000"
 *                 preferredPaymentMethod: "UPI"
 *                 isActive: true
 *                 isVip: true
 *                 customerSince: "2024-01-01T00:00:00Z"
 *                 lastOrderDate: "2024-01-15T00:00:00Z"
 *                 totalOrdersCount: 5
 *                 totalSpent: 250.50
 *                 emailNotifications: false
 *                 smsNotifications: true
 *                 pushNotifications: true
 *                 createdAt: "2024-01-01T00:00:00Z"
 *                 updatedAt: "2024-01-01T12:00:00Z"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/customers/delete-customer:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Delete a customer
 *     description: Remove a customer from the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteCustomerRequest'
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: "Customer deleted successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

export {};
