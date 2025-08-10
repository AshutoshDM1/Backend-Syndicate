/**
 * @swagger
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: string
 *       enum: [STARTED, CONFIRMED, PREPARING, READY, SERVED, COMPLETED, CANCELLED]
 *       description: Status of the order
 *     PaymentMethod:
 *       type: string
 *       enum: [CASH, CARD, UPI, WALLET]
 *       description: Payment method for the order
 *     OrderItem:
 *       type: object
 *       properties:
 *         menuItemId:
 *           type: string
 *           format: uuid
 *           description: Menu item unique identifier
 *           nullable: true
 *         comboMealId:
 *           type: string
 *           format: uuid
 *           description: Combo meal unique identifier
 *           nullable: true
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of the item
 *           example: 2
 *       required:
 *         - quantity
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - tableId
 *         - customerName
 *         - customerPhone
 *         - totalAmount
 *         - orderItems
 *       properties:
 *         tableId:
 *           type: string
 *           format: uuid
 *           description: Table unique identifier
 *         customerName:
 *           type: string
 *           minLength: 1
 *           description: Name of the customer
 *           example: "John Doe"
 *         customerPhone:
 *           type: integer
 *           minimum: 1
 *           description: Phone number of the customer
 *           example: 1234567890
 *         totalAmount:
 *           type: number
 *           minimum: 0
 *           description: Total amount for the order
 *           example: 299.99
 *         status:
 *           $ref: '#/components/schemas/OrderStatus'
 *           default: STARTED
 *         paymentMethod:
 *           $ref: '#/components/schemas/PaymentMethod'
 *           default: CASH
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           minItems: 1
 *           description: List of items in the order
 *     UpdateOrderRequest:
 *       type: object
 *       properties:
 *         status:
 *           $ref: '#/components/schemas/OrderStatus'
 *         tableId:
 *           type: string
 *           format: uuid
 *           description: Table unique identifier
 *         customerName:
 *           type: string
 *           minLength: 1
 *           description: Name of the customer
 *         customerPhone:
 *           type: integer
 *           minimum: 1
 *           description: Phone number of the customer
 *         totalAmount:
 *           type: number
 *           minimum: 0
 *           description: Total amount for the order
 *         paymentMethod:
 *           $ref: '#/components/schemas/PaymentMethod'
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: List of items in the order
 *     OrderResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Order unique identifier
 *         tableId:
 *           type: string
 *           format: uuid
 *           description: Table unique identifier
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *         customerPhone:
 *           type: integer
 *           description: Phone number of the customer
 *         orderTime:
 *           type: string
 *           format: date-time
 *           description: Time when the order was created
 *         totalAmount:
 *           type: number
 *           description: Total amount for the order
 *         status:
 *           $ref: '#/components/schemas/OrderStatus'
 *         paymentMethod:
 *           $ref: '#/components/schemas/PaymentMethod'
 *         customerId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Customer unique identifier
 * /api/v1/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Create a new order with order items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *           examples:
 *             example1:
 *               summary: Basic order creation
 *               value:
 *                 tableId: "123e4567-e89b-12d3-a456-426614174000"
 *                 customerName: "John Doe"
 *                 customerPhone: 1234567890
 *                 totalAmount: 299.99
 *                 status: "STARTED"
 *                 paymentMethod: "CASH"
 *                 orderItems:
 *                   - menuItemId: "123e4567-e89b-12d3-a456-426614174001"
 *                     quantity: 2
 *                   - comboMealId: "123e4567-e89b-12d3-a456-426614174002"
 *                     quantity: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Retrieve all orders with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/OrderStatus'
 *         description: Filter by order status
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
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/ValidationError'
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
 * /api/v1/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order unique identifier
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderResponse'
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
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update an order
 *     description: Update an existing order by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderRequest'
 *           examples:
 *             example1:
 *               summary: Update order status
 *               value:
 *                 status: "CONFIRMED"
 *             example2:
 *               summary: Update order details
 *               value:
 *                 customerName: "Jane Doe"
 *                 customerPhone: 9876543210
 *                 totalAmount: 399.99
 *                 paymentMethod: "CARD"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderResponse'
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
 * components:
 *   schemas:
 *     CreateOrderItemRequest:
 *       type: object
 *       required:
 *         - orderId
 *         - quantity
 *       properties:
 *         orderId:
 *           type: string
 *           format: uuid
 *           description: Order unique identifier
 *         menuItemId:
 *           type: string
 *           format: uuid
 *           description: Menu item unique identifier
 *           nullable: true
 *         comboMealId:
 *           type: string
 *           format: uuid
 *           description: Combo meal unique identifier
 *           nullable: true
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of the item
 *           example: 2
 *     OrderItemResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Order item unique identifier
 *         orderId:
 *           type: string
 *           format: uuid
 *           description: Order unique identifier
 *         menuItemId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Menu item unique identifier
 *         comboMealId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Combo meal unique identifier
 *         quantity:
 *           type: integer
 *           description: Quantity of the item
 * /api/v1/order-items:
 *   post:
 *     tags:
 *       - Order Items
 *     summary: Create order items
 *     description: Create order items for an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderItemRequest'
 *           examples:
 *             example1:
 *               summary: Menu item order
 *               value:
 *                 orderId: "123e4567-e89b-12d3-a456-426614174000"
 *                 menuItemId: "123e4567-e89b-12d3-a456-426614174001"
 *                 quantity: 2
 *             example2:
 *               summary: Combo meal order
 *               value:
 *                 orderId: "123e4567-e89b-12d3-a456-426614174000"
 *                 comboMealId: "123e4567-e89b-12d3-a456-426614174002"
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Order items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order items created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderItemResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   get:
 *     tags:
 *       - Order Items
 *     summary: Get order items
 *     description: Retrieve order items, optionally filtered by order ID
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by order ID
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order items retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderItemResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
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
 * /api/v1/order-items/{id}:
 *   get:
 *     tags:
 *       - Order Items
 *     summary: Get order items by ID
 *     description: Retrieve order items by their unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order item unique identifier
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order items retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderItemResponse'
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
 *   delete:
 *     tags:
 *       - Order Items
 *     summary: Delete order item by ID
 *     description: Remove an order item by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order item unique identifier
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order item deleted successfully"
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

