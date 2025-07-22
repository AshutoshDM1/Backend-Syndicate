import { z } from 'zod';

// ============ CATEGORY VALIDATION SCHEMAS ============
export const createCategorySchema = z.object({
    name: z.string()
      .min(1, 'Category name is required')
      .max(100, 'Category name must be less than 100 characters')
      .trim(),
    
    description: z.string()
      .max(500, 'Description must be less than 500 characters')
      .optional()
      .nullable(),
    
    sortOrder: z.number()
      .int('Sort order must be an integer')
      .min(0, 'Sort order cannot be negative')
      .optional()
      .default(0)
  });
  
  export const updateCategorySchema = z.object({
    id: z.string().uuid('Invalid category ID format'),
    name: z.string()
      .min(1, 'Category name is required')
      .max(100, 'Category name must be less than 100 characters')
      .trim()
      .optional(),
    
    description: z.string()
      .max(500, 'Description must be less than 500 characters')
      .optional()
      .nullable(),
    
    isActive: z.boolean().optional(),
    
    sortOrder: z.number()
      .int('Sort order must be an integer')
      .min(0, 'Sort order cannot be negative')
      .optional()
  });
  
  export const getCategoryByIdSchema = z.object({
    id: z.string().uuid('Invalid category ID format')
  });
  
  export const deleteCategorySchema = z.object({
    id: z.string().uuid('Invalid category ID format')
  });

export const getCategoriesQuerySchema = z.object({
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10),
    isActive: z.boolean().optional(),
    search: z.string().optional(),
    sortBy: z.enum(['name', 'createdAt', 'sortOrder']).optional().default('sortOrder'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
  });


  export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
  export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
  export type GetCategoryByIdInput = z.infer<typeof getCategoryByIdSchema>;
  export type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;
  export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>;