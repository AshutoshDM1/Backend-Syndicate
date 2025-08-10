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
import { getComboMeals, getComboMealById } from '../../controllers/MenuItemsController/ComboMealController';
import { createComboMeal } from '../../controllers/MenuItemsController/ComboMealController/createComboMeal.controller';
import { updateComboMeal } from '../../controllers/MenuItemsController/ComboMealController/updateComboMeal.controller';
import { deleteComboMeal } from '../../controllers/MenuItemsController/ComboMealController/deleteComboMeal.controller';

const comboMealsRoutes = Router();

// ============ MENU ITEM ROUTES ============
// GET /api/v1/menu-items - Get all menu items with filtering and pagination
comboMealsRoutes.get('/', validateQuery(getMenuItemsQuerySchema), getComboMeals);    

// GET /api/v1/menu-items/:id - Get menu item by ID
comboMealsRoutes.get('/:id', validateParams(getMenuItemByIdSchema), getComboMealById);

// POST /api/v1/menu-items - Create new menu item
comboMealsRoutes.post('/', validateSchema(createMenuItemSchema), createComboMeal);

// PUT /api/v1/menu-items/:id - Update menu item
comboMealsRoutes.put('/:id', validateParams(getMenuItemByIdSchema), validateSchema(updateMenuItemSchema), updateComboMeal);

// DELETE /api/v1/menu-items/:id - Delete menu item
comboMealsRoutes.delete('/:id', validateParams(deleteMenuItemSchema), deleteComboMeal);

// Note: Category and Modifier routes are handled by separate route files
// - Categories: /api/v1/categories
// - Modifiers: /api/v1/modifiers

export default comboMealsRoutes;