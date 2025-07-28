import { Router } from 'express';
import { validateParams, validateQuery, validateSchema } from '../utils/validation.middleware';
import {
  createOrderItems,
  createOrderItemsSchema,
  getOrderItemsbyID,
  getOrderItemsByIdSchema,
  getOrderItemsOrderID,
  getOrderItemsSchema,
  updateOrderItemsSchema,
} from '../controllers/OrderItemController';

const router = Router();

// POST /api/v1/orders - Create a new order
router.post('/', validateSchema(createOrderItemsSchema), createOrderItems);

// GET /api/v1/orders - Get all orders with filtering and pagination
router.get('/', validateQuery(getOrderItemsSchema), getOrderItemsOrderID);

// GET /api/v1/orders/:id - Get order by ID
router.get('/:id', validateParams(getOrderItemsByIdSchema), getOrderItemsbyID);


// DELETE /api/v1/orders/:id - Delete order

export default router;
