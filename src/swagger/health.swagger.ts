/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Check server health status
 *     description: Returns the health status of the server
 *     responses:
 *       200:
 *         description: Server is running successfully
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
 *                   example: "Server is running"
 *             example:
 *               success: true
 *               message: "Server is running"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Root endpoint
 *     description: Returns basic server information
 *     responses:
 *       200:
 *         description: Server is running successfully
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
 *                   example: "Server is running"
 *             example:
 *               success: true
 *               message: "Server is running"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

export {}; 