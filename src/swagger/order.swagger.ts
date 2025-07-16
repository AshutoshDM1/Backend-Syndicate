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
 *           description: Unique identifier for the order
 *         tableId:
 *           type: string
 *           format: uuid
 *           description: ID of the table where the order is placed
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *           minLength: 2
 *           maxLength: 100
 *         customerPhone:
 *           type: integer
 *           description: Customer's phone number (optional)
 *           minimum: 1000000000
 *           maximum: 999999999999999
 *         orderTime:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order was created
 *         totalAmount:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           enum: [STARTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *           description: Current status of the order
 *         paymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Method of payment for the order
 *         table:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             number:
 *               type: string
 *             floor:
 *               type: integer
 *             status:
 *               type: string
 *               enum: [AVAILABLE, OCCUPIED, RESERVED, ORDERING, NEEDS_CLEANING]
 *           description: Table information
 *         orderDuration:
 *           type: integer
 *           description: Duration of the order in minutes (only for active orders)
 *           nullable: true
 *       required:
 *         - id
 *         - tableId
 *         - customerName
 *         - orderTime
 *         - totalAmount
 *         - status
 *         - paymentMethod
 *         - table
 * 
 *     CreateOrderRequest:
 *       type: object
 *       properties:
 *         tableId:
 *           type: string
 *           format: uuid
 *           description: ID of the table where the order is placed
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *           minLength: 2
 *           maxLength: 100
 *         customerPhone:
 *           type: integer
 *           description: Customer's phone number (optional)
 *           minimum: 1000000000
 *           maximum: 999999999999999
 *         paymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Method of payment for the order
 *       required:
 *         - tableId
 *         - customerName
 *         - paymentMethod
 * 
 *     UpdateOrderRequest:
 *       type: object
 *       properties:
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *           minLength: 2
 *           maxLength: 100
 *         customerPhone:
 *           type: integer
 *           description: Customer's phone number
 *           minimum: 1000000000
 *           maximum: 999999999999999
 *         totalAmount:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           enum: [STARTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *           description: Current status of the order
 *         paymentMethod:
 *           type: string
 *           enum: [CASH, CREDIT_CARD, DEBIT_CARD, UPI, WALLET, NET_BANKING]
 *           description: Method of payment for the order
 * 
 *     OrdersListResponse:
 *       type: object
 *       properties:
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of orders
 *             page:
 *               type: integer
 *               description: Current page number
 *             limit:
 *               type: integer
 *               description: Number of orders per page
 *             totalPages:
 *               type: integer
 *               description: Total number of pages
 *         filters:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [STARTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *             tableId:
 *               type: string
 *               format: uuid
 *             customerName:
 *               type: string
 *             startDate:
 *               type: string
 *               format: date
 *             endDate:
 *               type: string
 *               format: date
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           description: Response data
 * 
 *     ApiError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: Detailed error messages
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for a specific table and updates the table status
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *           example:
 *             tableId: "123e4567-e89b-12d3-a456-426614174000"
 *             customerName: "John Doe"
 *             customerPhone: 9876543210
 *             paymentMethod: "CASH"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Order'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Order created successfully"
 *               data:
 *                 id: "456e7890-e89b-12d3-a456-426614174001"
 *                 tableId: "123e4567-e89b-12d3-a456-426614174000"
 *                 customerName: "John Doe"
 *                 customerPhone: 9876543210
 *                 orderTime: "2024-01-15T10:30:00.000Z"
 *                 totalAmount: 0
 *                 status: "STARTED"
 *                 paymentMethod: "CASH"
 *                 table:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   number: "A1"
 *                   floor: 1
 *                   status: "ORDERING"
 *       400:
 *         description: Validation failed or table not available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: "Validation failed"
 *               errors: ["Customer name is required and must be a valid string"]
 *       404:
 *         description: Table not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: "Table not found"
 *               errors: []
 * 
 *   get:
 *     summary: Get all orders with filtering and pagination
 *     description: Retrieve orders with optional filtering by status, table, customer, date range, and pagination
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [STARTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *         description: Filter by order status
 *       - in: query
 *         name: tableId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by table ID
 *       - in: query
 *         name: customerName
 *         schema:
 *           type: string
 *         description: Filter by customer name (partial match, case insensitive)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders from this date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders until this date (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [orderTime, totalAmount, customerName]
 *           default: orderTime
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OrdersListResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Found 25 orders"
 *               data:
 *                 orders:
 *                   - id: "456e7890-e89b-12d3-a456-426614174001"
 *                     tableId: "123e4567-e89b-12d3-a456-426614174000"
 *                     customerName: "John Doe"
 *                     customerPhone: 9876543210
 *                     orderTime: "2024-01-15T10:30:00.000Z"
 *                     totalAmount: 150.50
 *                     status: "COMPLETED"
 *                     paymentMethod: "CASH"
 *                     table:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       number: "A1"
 *                       floor: 1
 *                 pagination:
 *                   total: 25
 *                   page: 1
 *                   limit: 10
 *                   totalPages: 3
 *                 filters:
 *                   status: null
 *                   tableId: null
 *                   customerName: null
 *                   startDate: null
 *                   endDate: null
 *       400:
 *         description: Invalid pagination parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve detailed information about a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Order'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Order retrieved successfully"
 *               data:
 *                 id: "456e7890-e89b-12d3-a456-426614174001"
 *                 tableId: "123e4567-e89b-12d3-a456-426614174000"
 *                 customerName: "John Doe"
 *                 customerPhone: 9876543210
 *                 orderTime: "2024-01-15T10:30:00.000Z"
 *                 totalAmount: 150.50
 *                 status: "IN_PROGRESS"
 *                 paymentMethod: "CASH"
 *                 table:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   number: "A1"
 *                   floor: 1
 *                   status: "OCCUPIED"
 *                   size: "MEDIUM"
 *                 orderDuration: 45
 *       400:
 *         description: Invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 * 
 *   put:
 *     summary: Update order
 *     description: Update order details including status, customer information, and payment method
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderRequest'
 *           example:
 *             status: "COMPLETED"
 *             totalAmount: 250.75
 *             paymentMethod: "CREDIT_CARD"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Order'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Order updated successfully"
 *               data:
 *                 id: "456e7890-e89b-12d3-a456-426614174001"
 *                 tableId: "123e4567-e89b-12d3-a456-426614174000"
 *                 customerName: "John Doe"
 *                 customerPhone: 9876543210
 *                 orderTime: "2024-01-15T10:30:00.000Z"
 *                 totalAmount: 250.75
 *                 status: "COMPLETED"
 *                 paymentMethod: "CREDIT_CARD"
 *                 table:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   number: "A1"
 *                   floor: 1
 *                   status: "NEEDS_CLEANING"
 *       400:
 *         description: Validation failed or cannot update completed/cancelled order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: "Cannot update order with status: COMPLETED"
 *               errors: []
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */ 