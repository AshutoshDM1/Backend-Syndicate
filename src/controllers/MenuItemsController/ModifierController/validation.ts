import { z } from 'zod';
import { ModifierType } from '../../../../prisma/generated/prisma';

// Enum validations
export const ModifierTypeEnum = z.nativeEnum(ModifierType);

// ============ MODIFIER VALIDATION SCHEMAS ============
export const createModifierSchema = z.object({
  name: z
    .string()
    .min(1, 'Modifier name is required')
    .max(100, 'Modifier name must be less than 100 characters')
    .trim(),

  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(9999999.99, 'Price cannot exceed 9,999,999.99')
    .multipleOf(0.01, 'Price must have at most 2 decimal places')
    .optional()
    .default(0),

  type: ModifierTypeEnum,

  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .nullable(),

  isAvailable: z.boolean().optional().default(true),
});

export const updateModifierSchema = z.object({
  id: z.string().uuid('Invalid modifier ID format'),
  name: z
    .string()
    .min(1, 'Modifier name is required')
    .max(100, 'Modifier name must be less than 100 characters')
    .trim()
    .optional(),

  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(9999999.99, 'Price cannot exceed 9,999,999.99')
    .multipleOf(0.01, 'Price must have at most 2 decimal places')
    .optional(),

  type: ModifierTypeEnum.optional(),

  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .nullable(),

  isAvailable: z.boolean().optional(),
});

export const getModifierByIdSchema = z.object({
  id: z.string().uuid('Invalid modifier ID format'),
});

export const deleteModifierSchema = z.object({
  id: z.string().uuid('Invalid modifier ID format'),
});

export const getModifiersQuerySchema = z.object({
  page: z
    .number()
    .int('Page must be an integer')
    .min(1, 'Page must be greater than 0')
    .optional()
    .default(1),

  limit: z
    .number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be greater than 0')
    .max(100, 'Limit must be less than 100')
    .optional()
    .default(10),

  type: ModifierTypeEnum.optional(),

  isAvailable: z
    .string()
    .transform((val) => val === 'true')
    .optional(),

  search: z.string().max(100, 'Search term must be less than 100 characters').optional(),

  sortBy: z.enum(['name', 'price', 'type', 'createdAt']).optional().default('name'),

  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type CreateModifierInput = z.infer<typeof createModifierSchema>;
export type UpdateModifierInput = z.infer<typeof updateModifierSchema>;
export type GetModifierByIdInput = z.infer<typeof getModifierByIdSchema>;
export type DeleteModifierInput = z.infer<typeof deleteModifierSchema>;
export type GetModifiersQuery = z.infer<typeof getModifiersQuerySchema>;
