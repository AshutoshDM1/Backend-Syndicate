import { Router } from 'express';
import {
  createOrder,
  getOrder,
  getOrderbyID,
  updateOrder,
} from '../../controllers/OrderController/index';
import { validateSchema, validateQuery, validateParams } from '../../utils/validation.middleware';
import {
  createOrderSchema,
  getOrderSchema,
  getOrderByIdSchema,
  updateOrderSchema,
} from '../../controllers/OrderController/validation';

const orderRoutes = Router();

// POST /api/v1/orders - Create a new order
orderRoutes.post('/', validateSchema(createOrderSchema), createOrder);

// GET /api/v1/orders - Get all orders with filtering and pagination
orderRoutes.get('/', validateQuery(getOrderSchema), getOrder);

// GET /api/v1/orders/:id - Get order by ID
orderRoutes.get('/:id', validateParams(getOrderByIdSchema), getOrderbyID);

// PUT /api/v1/orders/:id - Update order
orderRoutes.put(
  '/:id',
  validateParams(getOrderByIdSchema),
  validateSchema(updateOrderSchema),
  updateOrder
);

// DELETE /api/v1/orders/:id - Delete order

export default orderRoutes;
