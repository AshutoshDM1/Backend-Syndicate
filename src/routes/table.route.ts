import { Router } from 'express';
import {
  createTable,
  getTable,
  getTableById,
  deleteTable,
  updateTable,
} from '../controllers/TableControllers';

import {
  createTableSchema,
  getTableByIdSchema,
  getTablesQuerySchema,
  deleteTableSchema,
  updateTableSchema,
} from '../controllers/TableControllers/validation';
import { validateSchema, validateParams, validateQuery } from '../utils/validation.middleware';

const tableRoutes = Router();

// GET /api/v1/tables - Get all tables with optional filtering and pagination
tableRoutes.get('/', validateQuery(getTablesQuerySchema), getTable);

// GET /api/v1/tables/:id - Get table by ID
tableRoutes.get('/:id', validateParams(getTableByIdSchema), getTableById);

// POST /api/v1/tables - Create new table
tableRoutes.post('/', validateSchema(createTableSchema), createTable);

// PUT /api/v1/tables/- Update table
tableRoutes.put('/', validateSchema(updateTableSchema), updateTable);

// DELETE /api/v1/tables/:id - Delete table
tableRoutes.delete('/:id', validateParams(deleteTableSchema), deleteTable);

export default tableRoutes;
