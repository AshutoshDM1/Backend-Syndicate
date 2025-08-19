import { Router } from 'express';
import {
  getCustomerDetails,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../controllers/CustomerController/index';

import { validateSchema, validateParams, validateQuery } from '../utils/validation.middleware';
import {
  deleteCustomerSchema,
  getCustomerByIdSchema,
  updateCustomerSchema,
} from '../controllers/CustomerController/validation';

const customerRoutes = Router();

// GET /api/v1/customers - Get all customers
customerRoutes.get('/', getCustomerDetails);

// GET /api/v1/customers/:id - Get customers by ID
customerRoutes.get('/:id', validateParams(getCustomerByIdSchema), getCustomerById);

// PUT /api/v1/customers/:id - Update customers by ID
customerRoutes.put('/', validateSchema(updateCustomerSchema), updateCustomer);

// DELETE /api/v1/customers/:id - Delete customers by ID
customerRoutes.delete('/:id', validateParams(deleteCustomerSchema), deleteCustomer);

export default customerRoutes;
