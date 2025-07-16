import { Router } from 'express';
import { createTable } from '../controllers/TableControllers/createTable.controller';
import { getTable } from '../controllers/TableControllers/getTable.controller';
import { getTableById } from '../controllers/TableControllers/getTableById.controller';
import { deleteTable } from '../controllers/TableControllers/deleteTable.controller';
import { 
  createTableSchema, 
  getTableByIdSchema, 
  getTablesQuerySchema, 
  deleteTableSchema 
} from '../controllers/TableControllers/validation';
import { validateSchema, validateParams, validateQuery } from '../utils/validation.middleware';

const tableRoutes = Router();

// GET /api/v1/tables - Get all tables with optional filtering and pagination
tableRoutes.get('/', validateQuery(getTablesQuerySchema), getTable);

// GET /api/v1/tables/:id - Get table by ID
tableRoutes.get('/:id', validateParams(getTableByIdSchema), getTableById);

// POST /api/v1/tables - Create new table
tableRoutes.post('/', validateSchema(createTableSchema), createTable);

// DELETE /api/v1/tables/:id - Delete table
tableRoutes.delete('/:id', validateParams(deleteTableSchema), deleteTable);

export default tableRoutes;
