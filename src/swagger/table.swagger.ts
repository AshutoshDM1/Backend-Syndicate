/**
 * @swagger
 * components:
 *   schemas:
 *     TableStatus:
 *       type: string
 *       enum: [AVAILABLE, OCCUPIED, RESERVED, OUT_OF_ORDER]
 *       description: Status of the table
 *     TableSize:
 *       type: string
 *       enum: [SMALL, MEDIUM, LARGE, EXTRA_LARGE]
 *       description: Size of the table
 *     CreateTableRequest:
 *       type: object
 *       required:
 *         - number
 *         - size
 *         - floor
 *       properties:
 *         number:
 *           type: string
 *           pattern: '^[A-Z0-9]+$'
 *           maxLength: 10
 *           description: Table number (uppercase letters and numbers only)
 *           example: "A1"
 *         status:
 *           $ref: '#/components/schemas/TableStatus'
 *           default: AVAILABLE
 *         size:
 *           $ref: '#/components/schemas/TableSize'
 *           example: MEDIUM
 *         floor:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           description: Floor number where the table is located
 *           example: 1
 *         customerCount:
 *           type: integer
 *           minimum: 0
 *           maximum: 20
 *           nullable: true
 *           description: Current number of customers at the table
 *           example: 4
 *     UpdateTableRequest:
 *       type: object
 *       properties:
 *         number:
 *           type: string
 *           pattern: '^[A-Z0-9]+$'
 *           maxLength: 10
 *           description: Table number (uppercase letters and numbers only)
 *           example: "A1"
 *         status:
 *           $ref: '#/components/schemas/TableStatus'
 *         size:
 *           $ref: '#/components/schemas/TableSize'
 *         floor:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           description: Floor number where the table is located
 *           example: 1
 *     TableResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the table
 *         number:
 *           type: string
 *           description: Table number
 *           example: "A1"
 *         status:
 *           $ref: '#/components/schemas/TableStatus'
 *         size:
 *           $ref: '#/components/schemas/TableSize'
 *         floor:
 *           type: integer
 *           description: Floor number
 *           example: 1
 *         orderId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Current order ID if table is occupied
 * /api/v1/tables:
 *   get:
 *     tags:
 *       - Tables
 *     summary: Get all tables
 *     description: Retrieve all tables with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/TableStatus'
 *         description: Filter by table status
 *       - in: query
 *         name: size
 *         schema:
 *           $ref: '#/components/schemas/TableSize'
 *         description: Filter by table size
 *       - in: query
 *         name: floor
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Filter by floor number
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
 *         description: Number of tables per page
 *     responses:
 *       200:
 *         description: Tables retrieved successfully
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
 *                   example: "Tables retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TableResponse'
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
 *   post:
 *     tags:
 *       - Tables
 *     summary: Create a new table
 *     description: Create a new table entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTableRequest'
 *           examples:
 *             example1:
 *               summary: Basic table creation
 *               value:
 *                 number: "A1"
 *                 size: "MEDIUM"
 *                 floor: 1
 *                 customerCount: 0
 *     responses:
 *       201:
 *         description: Table created successfully
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
 *                   example: "Table created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/TableResponse'
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
 * /api/v1/tables/{id}:
 *   get:
 *     tags:
 *       - Tables
 *     summary: Get table by ID
 *     description: Retrieve a specific table by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Table unique identifier
 *     responses:
 *       200:
 *         description: Table retrieved successfully
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
 *                   example: "Table retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/TableResponse'
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
 *       - Tables
 *     summary: Update table by ID
 *     description: Update an existing table by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Table unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTableRequest'
 *           examples:
 *             example1:
 *               summary: Update table status
 *               value:
 *                 status: "OCCUPIED"
 *             example2:
 *               summary: Update table details
 *               value:
 *                 number: "B2"
 *                 size: "LARGE"
 *                 floor: 2
 *     responses:
 *       200:
 *         description: Table updated successfully
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
 *                   example: "Table updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/TableResponse'
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
 *       - Tables
 *     summary: Delete table by ID
 *     description: Remove a table by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Table unique identifier
 *     responses:
 *       200:
 *         description: Table deleted successfully
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
 *                   example: "Table deleted successfully"
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
