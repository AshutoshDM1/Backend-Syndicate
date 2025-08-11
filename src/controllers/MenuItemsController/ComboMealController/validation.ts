import { z } from 'zod';

// ============ COMBO MEAL VALIDATION SCHEMAS ============
export const createComboMealSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  image: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID format'),
  isAvailable: z.boolean().optional().default(true),
  rating: z
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .multipleOf(0.1, 'Rating must have at most 1 decimal place')
    .optional()
    .nullable(),
  prepTime: z
    .number()
    .int('Preparation time must be an integer')
    .min(0, 'Preparation time cannot be negative')
    .optional()
    .nullable(),
  calories: z
    .number()
    .int('Calories must be an integer')
    .min(0, 'Calories cannot be negative')
    .optional()
    .nullable(),
});

export const updateComboMealSchema = z.object({
  id: z.string().uuid('Invalid combo meal ID format'),
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive').optional(),
  image: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID format').optional(),
  isAvailable: z.boolean().optional(),
  rating: z
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .multipleOf(0.1, 'Rating must have at most 1 decimal place')
    .optional()
    .nullable(),
});

export const getComboMealByIdSchema = z.object({
  id: z.string().uuid('Invalid combo meal ID format'),
});

export const deleteComboMealSchema = z.object({
  id: z.string().uuid('Invalid combo meal ID format'),
});

export const getComboMealsQuerySchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt', 'sortOrder']).optional().default('sortOrder'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type CreateComboMealInput = z.infer<typeof createComboMealSchema>;
export type UpdateComboMealInput = z.infer<typeof updateComboMealSchema>;
export type GetComboMealByIdInput = z.infer<typeof getComboMealByIdSchema>;
export type DeleteComboMealInput = z.infer<typeof deleteComboMealSchema>;
export type GetComboMealsQuery = z.infer<typeof getComboMealsQuerySchema>;
