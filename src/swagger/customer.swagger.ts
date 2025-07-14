/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the customer
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Reference to the user account
 *         preferredPaymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Customer preferred payment method
 *         isActive:
 *           type: boolean
 *           description: Whether the customer account is active
 *         isVip:
 *           type: boolean
 *           description: Whether the customer has VIP status
 *         customerSince:
 *           type: string
 *           format: date-time
 *           description: Date when customer joined
 *         lastOrderDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Date of last order placed
 *         totalOrdersCount:
 *           type: integer
 *           description: Total number of orders placed
 *         totalSpent:
 *           type: number
 *           format: decimal
 *           description: Total amount spent by customer
 *         emailNotifications:
 *           type: boolean
 *           description: Email notification preference
 *         smsNotifications:
 *           type: boolean
 *           description: SMS notification preference
 *         pushNotifications:
 *           type: boolean
 *           description: Push notification preference
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Customer creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Customer last update timestamp
 *         user:
 *           $ref: '#/components/schemas/User'
 *       required: [id, userId, isActive, isVip, customerSince, totalOrdersCount, totalSpent, createdAt, updatedAt]
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         userId: "456e7890-e89b-12d3-a456-426614174000"
 *         preferredPaymentMethod: "CREDIT_CARD"
 *         isActive: true
 *         isVip: false
 *         customerSince: "2024-01-01T00:00:00Z"
 *         lastOrderDate: "2024-01-15T00:00:00Z"
 *         totalOrdersCount: 5
 *         totalSpent: 250.50
 *         emailNotifications: true
 *         smsNotifications: true
 *         pushNotifications: false
 *         createdAt: "2024-01-01T00:00:00Z"
 *         updatedAt: "2024-01-01T00:00:00Z"
 * 
 *     CustomerListResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             customers:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *             totalCustomers:
 *               type: integer
 *               description: Total count of customers
 *           example:
 *             customers:
 *               - id: "123e4567-e89b-12d3-a456-426614174000"
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
 *             totalCustomers: 1
 *             message: "Customer data fetched successfully"
 * 
 *     CreateCustomerRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: User ID to link with customer
 *         preferredPaymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Preferred payment method
 *           default: CASH
 *         emailNotifications:
 *           type: boolean
 *           description: Email notification preference
 *           default: true
 *         smsNotifications:
 *           type: boolean
 *           description: SMS notification preference
 *           default: true
 *         pushNotifications:
 *           type: boolean
 *           description: Push notification preference
 *           default: true
 *       required: [userId]
 *       example:
 *         userId: "456e7890-e89b-12d3-a456-426614174000"
 *         preferredPaymentMethod: "CREDIT_CARD"
 *         emailNotifications: true
 *         smsNotifications: true
 *         pushNotifications: false
 * 
 *     UpdateCustomerRequest:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           format: uuid
 *           description: Customer ID to update
 *         preferredPaymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Preferred payment method to update
 *         isActive:
 *           type: boolean
 *           description: Customer active status to update
 *         isVip:
 *           type: boolean
 *           description: Customer VIP status to update
 *         emailNotifications:
 *           type: boolean
 *           description: Email notification preference to update
 *         smsNotifications:
 *           type: boolean
 *           description: SMS notification preference to update
 *         pushNotifications:
 *           type: boolean
 *           description: Push notification preference to update
 *       required: [customerId]
 *       example:
 *         customerId: "123e4567-e89b-12d3-a456-426614174000"
 *         preferredPaymentMethod: "UPI"
 *         isVip: true
 *         emailNotifications: false
 *         smsNotifications: true
 *         pushNotifications: true
 * 
 *     DeleteCustomerRequest:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           format: uuid
 *           description: Customer ID to delete
 *       required: [customerId]
 *       example:
 *         customerId: "123e4567-e89b-12d3-a456-426614174000"
 */

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