import { Router } from 'express';
import { validateParams, validateQuery, validateSchema } from '../../utils/validation.middleware';
import {
  createOrderItems,
  createOrderItemsSchema,
  getOrderItemsbyID,
  getOrderItemsByIdSchema,
  getOrderItemsOrderID,
  getOrderItemsSchema,
} from '../../controllers/OrderController/OrderItemController';

const orderItemRoutes = Router();

// POST /api/v1/orders - Create a new order
orderItemRoutes.post('/', validateSchema(createOrderItemsSchema), createOrderItems);

// GET /api/v1/orders - Get all orders with filtering and pagination
orderItemRoutes.get('/', validateQuery(getOrderItemsSchema), getOrderItemsOrderID);

// GET /api/v1/orders/:id - Get order by ID
orderItemRoutes.get('/:id', validateParams(getOrderItemsByIdSchema), getOrderItemsbyID);

// DELETE /api/v1/orders/:id - Delete order

export default orderItemRoutes;
