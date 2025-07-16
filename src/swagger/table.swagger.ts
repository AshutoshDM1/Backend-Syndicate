/**
 * @swagger
 * components:
 *   schemas:
 *     Table:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the table
 *         number:
 *           type: string
 *           description: Table number (e.g., "A1", "B2")
 *           pattern: ^[A-Z0-9]+$
 *           maxLength: 10
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OCCUPIED, RESERVED, ORDERING, NEEDS_CLEANING]
 *           description: Current status of the table
 *         size:
 *           type: string
 *           enum: [SMALL, MEDIUM, LARGE]
 *           description: Size category of the table
 *         floor:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           description: Floor number where the table is located
 *         customerCount:
 *           type: integer
 *           minimum: 0
 *           maximum: 20
 *           nullable: true
 *           description: Number of customers currently at the table
 *         orderStartTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Time when the current order was started
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TableOrder'
 *           description: Active orders associated with the table
 *       required:
 *         - id
 *         - number
 *         - status
 *         - size
 *         - floor
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         number: "A1"
 *         status: "AVAILABLE"
 *         size: "MEDIUM"
 *         floor: 1
 *         customerCount: 4
 *         orderStartTime: "2024-01-15T10:30:00Z"
 *         orders: []
 *
 *     TableOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Order ID
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *         orderTime:
 *           type: string
 *           format: date-time
 *           description: Time when order was placed
 *         totalAmount:
 *           type: number
 *           format: decimal
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           enum: [STARTED, IN_PROGRESS, COMPLETED, CANCELLED]
 *           description: Current status of the order
 *
 *     CreateTableRequest:
 *       type: object
 *       properties:
 *         number:
 *           type: string
 *           description: Table number (e.g., "A1", "B2")
 *           pattern: ^[A-Z0-9]+$
 *           maxLength: 10
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OCCUPIED, RESERVED, ORDERING, NEEDS_CLEANING]
 *           description: Initial status of the table
 *           default: AVAILABLE
 *         size:
 *           type: string
 *           enum: [SMALL, MEDIUM, LARGE]
 *           description: Size category of the table
 *         floor:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           description: Floor number where the table is located
 *         customerCount:
 *           type: integer
 *           minimum: 0
 *           maximum: 20
 *           nullable: true
 *           description: Number of customers currently at the table
 *         orderStartTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Time when the current order was started
 *       required:
 *         - number
 *         - size
 *         - floor
 *       example:
 *         number: "A1"
 *         status: "AVAILABLE"
 *         size: "MEDIUM"
 *         floor: 1
 *         customerCount: null
 *         orderStartTime: null
 *
 *     UpdateTableRequest:
 *       type: object
 *       properties:
 *         number:
 *           type: string
 *           description: Table number (e.g., "A1", "B2")
 *           pattern: ^[A-Z0-9]+$
 *           maxLength: 10
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OCCUPIED, RESERVED, ORDERING, NEEDS_CLEANING]
 *           description: Status of the table
 *         size:
 *           type: string
 *           enum: [SMALL, MEDIUM, LARGE]
 *           description: Size category of the table
 *         floor:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           description: Floor number where the table is located
 *         customerCount:
 *           type: integer
 *           minimum: 0
 *           maximum: 20
 *           nullable: true
 *           description: Number of customers currently at the table
 *         orderStartTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Time when the current order was started
 *       example:
 *         status: "OCCUPIED"
 *         customerCount: 4
 *         orderStartTime: "2024-01-15T10:30:00Z"
 *
 *     TableListResponse:
 *       type: object
 *       properties:
 *         tables:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Table'
 *           description: List of tables
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               description: Current page number
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             total:
 *               type: integer
 *               description: Total number of tables
 *             totalPages:
 *               type: integer
 *               description: Total number of pages
 *           required:
 *             - page
 *             - limit
 *             - total
 *             - totalPages
 *       required:
 *         - tables
 *         - pagination
 *       example:
 *         tables:
 *           - id: "123e4567-e89b-12d3-a456-426614174000"
 *             number: "A1"
 *             status: "AVAILABLE"
 *             size: "MEDIUM"
 *             floor: 1
 *             customerCount: null
 *             orderStartTime: null
 *             orders: []
 *         pagination:
 *           page: 1
 *           limit: 10
 *           total: 25
 *           totalPages: 3
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Table'
 *             - $ref: '#/components/schemas/TableListResponse'
 *           description: Response data
 *         message:
 *           type: string
 *           description: Response message
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *       required:
 *         - statusCode
 *         - data
 *         - message
 *         - success
 *
 *     ApiError:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Error message
 *         success:
 *           type: boolean
 *           description: Always false for errors
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: List of error details
 *       required:
 *         - statusCode
 *         - message
 *         - success
 *       example:
 *         statusCode: 400
 *         message: "Validation error"
 *         success: false
 *         errors: ["Table number is required"]
 *
 * /api/v1/tables:
 *   get:
 *     summary: Get all tables
 *     description: Retrieve a list of all tables with optional filtering and pagination
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, OCCUPIED, RESERVED, ORDERING, NEEDS_CLEANING]
 *         description: Filter tables by status
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *           enum: [SMALL, MEDIUM, LARGE]
 *         description: Filter tables by size
 *       - in: query
 *         name: floor
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Filter tables by floor number
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
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: Tables retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TableListResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 tables:
 *                   - id: "123e4567-e89b-12d3-a456-426614174000"
 *                     number: "A1"
 *                     status: "AVAILABLE"
 *                     size: "MEDIUM"
 *                     floor: 1
 *                     customerCount: null
 *                     orderStartTime: null
 *                     orders: []
 *                   - id: "123e4567-e89b-12d3-a456-426614174001"
 *                     number: "A2"
 *                     status: "OCCUPIED"
 *                     size: "LARGE"
 *                     floor: 1
 *                     customerCount: 6
 *                     orderStartTime: "2024-01-15T10:30:00Z"
 *                     orders:
 *                       - id: "order-123"
 *                         customerName: "John Doe"
 *                         orderTime: "2024-01-15T10:30:00Z"
 *                         totalAmount: 150.50
 *                         status: "IN_PROGRESS"
 *                 pagination:
 *                   page: 1
 *                   limit: 10
 *                   total: 25
 *                   totalPages: 3
 *               message: "Tables fetched successfully"
 *               success: true
 *       '400':
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 400
 *               message: "Invalid query parameters"
 *               success: false
 *               errors: ["Floor must be between 1 and 50"]
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 *
 *   post:
 *     summary: Create a new table
 *     description: Create a new table in the restaurant
 *     tags:
 *       - Tables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTableRequest'
 *           example:
 *             number: "A1"
 *             status: "AVAILABLE"
 *             size: "MEDIUM"
 *             floor: 1
 *             customerCount: null
 *             orderStartTime: null
 *     responses:
 *       '201':
 *         description: Table created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Table'
 *             example:
 *               statusCode: 201
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 number: "A1"
 *                 status: "AVAILABLE"
 *                 size: "MEDIUM"
 *                 floor: 1
 *                 customerCount: null
 *                 orderStartTime: null
 *               message: "Table created successfully"
 *               success: true
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 400
 *               message: "Validation error"
 *               success: false
 *               errors: ["Table number is required", "Size must be SMALL, MEDIUM, or LARGE"]
 *       '409':
 *         description: Table already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 409
 *               message: "Table A1 already exists on floor 1"
 *               success: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 *
 * /api/v1/tables/{id}:
 *   get:
 *     summary: Get table by ID
 *     description: Retrieve a specific table by its unique identifier
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the table
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '201':
 *         description: Table retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Table'
 *             example:
 *               statusCode: 201
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 number: "A1"
 *                 status: "OCCUPIED"
 *                 size: "MEDIUM"
 *                 floor: 1
 *                 customerCount: 4
 *                 orderStartTime: "2024-01-15T10:30:00Z"
 *               message: "Table by id fetched successfully"
 *               success: true
 *       '400':
 *         description: Invalid table ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 400
 *               message: "Invalid table ID format"
 *               success: false
 *               errors: ["ID must be a valid UUID"]
 *       '404':
 *         description: Table not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 404
 *               message: "Table not found"
 *               success: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 *
 *   delete:
 *     summary: Delete table
 *     description: Delete a specific table by its unique identifier
 *     tags:
 *       - Tables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the table to delete
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '201':
 *         description: Table deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Table'
 *             example:
 *               statusCode: 201
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 number: "A1"
 *                 status: "AVAILABLE"
 *                 size: "MEDIUM"
 *                 floor: 1
 *                 customerCount: null
 *                 orderStartTime: null
 *               message: "Table deleted successfully"
 *               success: true
 *       '400':
 *         description: Invalid table ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 400
 *               message: "Invalid table ID format"
 *               success: false
 *               errors: ["ID must be a valid UUID"]
 *       '404':
 *         description: Table not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 404
 *               message: "Table not found"
 *               success: false
 *       '409':
 *         description: Cannot delete table with active orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 409
 *               message: "Cannot delete table with active orders"
 *               success: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 *               success: false
 */ 