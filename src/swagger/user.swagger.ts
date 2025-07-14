/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: User full name
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         phone:
 *           type: string
 *           nullable: true
 *           description: User phone number
 *         role:
 *           type: string
 *           enum: [ADMIN, MANAGER, ORDER_MANAGER, KITCHEN_MANAGER, CUSTOMER]
 *           description: User role in the system
 *         emailVerified:
 *           type: boolean
 *           description: Whether the user email is verified
 *         image:
 *           type: string
 *           nullable: true
 *           description: User profile image URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 *       required: [id, name, email, emailVerified, createdAt, updatedAt]
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "John Doe"
 *         email: "john@example.com"
 *         phone: "+1234567890"
 *         role: "ADMIN"
 *         emailVerified: true
 *         image: null
 *         createdAt: "2024-01-01T00:00:00Z"
 *         updatedAt: "2024-01-01T00:00:00Z"
 * 
 *     UserListResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             totalUsers:
 *               type: integer
 *               description: Total count of users
 *             role:
 *               type: string
 *               description: Role filter applied
 *           example:
 *             users:
 *               - id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 phone: "+1234567890"
 *                 role: "ADMIN"
 *                 emailVerified: true
 *                 image: null
 *                 createdAt: "2024-01-01T00:00:00Z"
 *                 updatedAt: "2024-01-01T00:00:00Z"
 *             totalUsers: 1
 *             role: "ADMIN"
 *             message: "User detail table fetched successfully"
 * 
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name to update
 *         email:
 *           type: string
 *           format: email
 *           description: User email to update
 *         phone:
 *           type: string
 *           description: User phone to update
 *         role:
 *           type: string
 *           enum: [ADMIN, MANAGER, ORDER_MANAGER, KITCHEN_MANAGER, CUSTOMER]
 *           description: User role to update
 *         image:
 *           type: string
 *           description: User profile image URL to update
 *       example:
 *         name: "John Doe Updated"
 *         email: "john.updated@example.com"
 *         phone: "+1234567891"
 *         role: "MANAGER"
 *         image: "https://example.com/avatar.jpg"
 */

/**
 * @swagger
 * /api/v1/users/user-detail-table:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user details table
 *     description: Retrieve all users with optional role filtering
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ALL, ADMIN, MANAGER, ORDER_MANAGER, KITCHEN_MANAGER, CUSTOMER]
 *         description: Filter users by role (optional)
 *         example: ADMIN
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
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
 * /api/v1/users/update-user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user information
 *     description: Update user details including name, email, phone, role, and image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               message: "User updated successfully"
 *               user:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe Updated"
 *                 email: "john.updated@example.com"
 *                 phone: "+1234567891"
 *                 role: "MANAGER"
 *                 emailVerified: true
 *                 image: "https://example.com/avatar.jpg"
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

export {}; 