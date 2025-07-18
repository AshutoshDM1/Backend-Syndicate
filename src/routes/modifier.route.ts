import { Router } from 'express';
import {
  createModifier,
  getModifiers,
  getModifierById,
  updateModifier,
  deleteModifier
} from '../controllers/MenuItemsController';

import {
  createModifierSchema,
  updateModifierSchema,
  getModifierByIdSchema,
  deleteModifierSchema,
  getModifiersQuerySchema
} from '../controllers/MenuItemsController/validation';

import { validateSchema, validateParams, validateQuery } from '../utils/validation.middleware';

const modifierRoutes = Router();

// GET /api/v1/modifiers - Get all modifiers
modifierRoutes.get('/', validateQuery(getModifiersQuerySchema), getModifiers);

// GET /api/v1/modifiers/:id - Get modifier by ID
modifierRoutes.get('/:id', validateParams(getModifierByIdSchema), getModifierById);

// POST /api/v1/modifiers - Create new modifier
modifierRoutes.post('/', validateSchema(createModifierSchema), createModifier);

// PUT /api/v1/modifiers/:id - Update modifier
modifierRoutes.put('/:id', validateParams(getModifierByIdSchema), validateSchema(updateModifierSchema), updateModifier);

// DELETE /api/v1/modifiers/:id - Delete modifier
modifierRoutes.delete('/:id', validateParams(deleteModifierSchema), deleteModifier);

export default modifierRoutes; 