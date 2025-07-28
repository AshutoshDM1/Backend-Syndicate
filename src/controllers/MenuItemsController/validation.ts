import { z } from 'zod';
import { ModifierType } from '../../../prisma/generated/prisma';

// Enum validations
export const ModifierTypeEnum = z.nativeEnum(ModifierType);

// ============ MENU ITEM VALIDATION SCHEMAS ============
export const createMenuItemSchema = z.object({
  name: z.string()
    .min(1, 'Menu item name is required')
    .max(200, 'Menu item name must be less than 200 characters')
    .trim(),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .nullable(),
  
  price: z.number()
    .positive('Price must be positive')
    .max(9999999.99, 'Price cannot exceed 9,999,999.99')
    .multipleOf(0.01, 'Price must have at most 2 decimal places'),
  
  image: z.string()
    .url('Invalid image URL format')
    .optional()
    .nullable(),
  
  categoryId: z.string()
    .min(1, 'Category ID is required')
    .max(255, 'Category ID must be less than 255 characters')
    .trim(),
  
  isAvailable: z.boolean().optional().default(true),
  
  rating: z.number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .multipleOf(0.1, 'Rating must have at most 1 decimal place')
    .optional()
    .nullable(),
  
  prepTime: z.number()
    .int('Preparation time must be an integer')
    .min(0, 'Preparation time cannot be negative')
    .max(300, 'Preparation time cannot exceed 300 minutes')
    .optional()
    .nullable(),
  
  calories: z.number()
    .int('Calories must be an integer')
    .min(0, 'Calories cannot be negative')
    .max(10000, 'Calories cannot exceed 10,000')
    .optional()
    .nullable(),
  
  isVegetarian: z.boolean().optional().default(false),
  isVegan: z.boolean().optional().default(false),
  isGlutenFree: z.boolean().optional().default(false),
  isSpicy: z.boolean().optional().default(false),
  
  sortOrder: z.number()
    .int('Sort order must be an integer')
    .min(0, 'Sort order cannot be negative')
    .optional()
    .default(0)
});

export const updateMenuItemSchema = z.object({
  name: z.string()
    .min(1, 'Menu item name is required')
    .max(200, 'Menu item name must be less than 200 characters')
    .trim()
    .optional(),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .nullable(),
  
  price: z.number()
    .positive('Price must be positive')
    .max(9999999.99, 'Price cannot exceed 9,999,999.99')
    .multipleOf(0.01, 'Price must have at most 2 decimal places')
    .optional(),
  
  image: z.string()
    .url('Invalid image URL format')
    .optional()
    .nullable(),
  
  categoryId: z.string()
    .min(1, 'Category ID is required')
    .max(255, 'Category ID must be less than 255 characters')
    .trim()
    .optional(),
  
  isAvailable: z.boolean().optional(),
  
  rating: z.number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .multipleOf(0.1, 'Rating must have at most 1 decimal place')
    .optional()
    .nullable(),
  
  prepTime: z.number()
    .int('Preparation time must be an integer')
    .min(0, 'Preparation time cannot be negative')
    .max(300, 'Preparation time cannot exceed 300 minutes')
    .optional()
    .nullable(),
  
  calories: z.number()
    .int('Calories must be an integer')
    .min(0, 'Calories cannot be negative')
    .max(10000, 'Calories cannot exceed 10,000')
    .optional()
    .nullable(),
  
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  
  sortOrder: z.number()
    .int('Sort order must be an integer')
    .min(0, 'Sort order cannot be negative')
    .optional()
});

export const getMenuItemByIdSchema = z.object({
  id: z.string().uuid('Invalid menu item ID format')
});

export const deleteMenuItemSchema = z.object({
  id: z.string().uuid('Invalid menu item ID format')
});

export const getMenuItemsQuerySchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be greater than 0')
    .optional()
    .default(1),
  
  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be greater than 0')
    .max(100, 'Limit must be less than 100')
    .optional()
    .default(10),
  
  categoryId: z.string().uuid('Invalid category ID format').optional(),
  
  isAvailable: z.string()
    .transform(val => val === 'true')
    .optional(),
  
  isVegetarian: z.string()
    .transform(val => val === 'true')
    .optional(),
  
  isVegan: z.string()
    .transform(val => val === 'true')
    .optional(),
  
  isGlutenFree: z.string()
    .transform(val => val === 'true')
    .optional(),
  
  isSpicy: z.string()
    .transform(val => val === 'true')
    .optional(),
  
  search: z.string()
    .max(100, 'Search term must be less than 100 characters')
    .optional(),
  
  sortBy: z.enum(['name', 'price', 'rating', 'createdAt', 'sortOrder'])
    .optional()
    .default('sortOrder'),
  
  sortOrder: z.enum(['asc', 'desc'])
    .optional()
    .default('asc')
});

// ============ TYPE EXPORTS ============

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
export type GetMenuItemsQuery = z.infer<typeof getMenuItemsQuerySchema>;
export type GetMenuItemByIdInput = z.infer<typeof getMenuItemByIdSchema>;
export type DeleteMenuItemInput = z.infer<typeof deleteMenuItemSchema>;