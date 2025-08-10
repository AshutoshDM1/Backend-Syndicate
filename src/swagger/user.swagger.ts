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