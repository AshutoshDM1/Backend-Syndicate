import { Router } from 'express';

import { validateSchema, validateParams, validateQuery } from '../../utils/validation.middleware';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategoriesQuerySchema,
  getCategoryByIdSchema,
  updateCategorySchema,
} from '../../controllers/MenuItemsController/CategoryController/validation';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../../controllers/MenuItemsController/CategoryController';

const categoryRoutes = Router();

// GET /api/v1/categories - Get all categories
categoryRoutes.get('/', validateQuery(getCategoriesQuerySchema), getCategories);

// GET /api/v1/categories/:id - Get category by ID
categoryRoutes.get('/:id', validateParams(getCategoryByIdSchema), getCategoryById);

// POST /api/v1/categories - Create new category
categoryRoutes.post('/', validateSchema(createCategorySchema), createCategory);

// PUT /api/v1/categories/:id - Update category
categoryRoutes.put(
  '/:id',
  validateParams(getCategoryByIdSchema),
  validateSchema(updateCategorySchema),
  updateCategory
);

// DELETE /api/v1/categories/:id - Delete category
categoryRoutes.delete('/:id', validateParams(deleteCategorySchema), deleteCategory);

export default categoryRoutes;
