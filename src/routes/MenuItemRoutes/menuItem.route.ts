import { Router } from 'express';
import {
  // Menu Item Controllers
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} from '../../controllers/MenuItemsController';

import {
  // Menu Item Validation
  createMenuItemSchema,
  updateMenuItemSchema,
  getMenuItemByIdSchema,
  deleteMenuItemSchema,
  getMenuItemsQuerySchema
} from '../../controllers/MenuItemsController/validation';

import { validateSchema, validateParams, validateQuery } from '../../utils/validation.middleware';

const menuItemRoutes = Router();

// ============ MENU ITEM ROUTES ============
// GET /api/v1/menu-items - Get all menu items with filtering and pagination
menuItemRoutes.get('/', validateQuery(getMenuItemsQuerySchema), getMenuItems);

// GET /api/v1/menu-items/:id - Get menu item by ID
menuItemRoutes.get('/:id', validateParams(getMenuItemByIdSchema), getMenuItemById);

// POST /api/v1/menu-items - Create new menu item
menuItemRoutes.post('/', validateSchema(createMenuItemSchema), createMenuItem);

// PUT /api/v1/menu-items/:id - Update menu item
menuItemRoutes.put('/:id', validateParams(getMenuItemByIdSchema), validateSchema(updateMenuItemSchema), updateMenuItem);

// DELETE /api/v1/menu-items/:id - Delete menu item
menuItemRoutes.delete('/:id', validateParams(deleteMenuItemSchema), deleteMenuItem);

// Note: Category and Modifier routes are handled by separate route files
// - Categories: /api/v1/categories
// - Modifiers: /api/v1/modifiers

export default menuItemRoutes;