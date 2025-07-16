import { z } from 'zod';
import { TableStatus, TableSize } from '../../../prisma/generated/prisma';
// Enum validations based on Prisma schema
export const TableStatusEnum = z.nativeEnum(TableStatus);
export const TableSizeEnum = z.nativeEnum(TableSize);

// Create table validation schema
export const createTableSchema = z.object({
  number: z.string()
    .min(1, 'Table number is required')
    .max(10, 'Table number must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Table number must contain only uppercase letters and numbers'),
  
  status: TableStatusEnum.optional().default('AVAILABLE'),
  
  size: TableSizeEnum,
  
  floor: z.number()
    .int('Floor must be an integer')
    .min(1, 'Floor must be at least 1')
    .max(50, 'Floor cannot exceed 50'),
  
  customerCount: z.number()
    .int('Customer count must be an integer')
    .min(0, 'Customer count cannot be negative')
    .max(20, 'Customer count cannot exceed 20')
    .optional()
    .nullable(),
  
  orderStartTime: z.string()
    .datetime('Invalid datetime format')
    .optional()
    .nullable()
    .transform((val) => val ? new Date(val) : null)
});

// Update table validation schema
export const updateTableSchema = z.object({
  number: z.string()
    .min(1, 'Table number is required')
    .max(10, 'Table number must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Table number must contain only uppercase letters and numbers')
    .optional(),
  
  status: TableStatusEnum.optional(),
  
  size: TableSizeEnum.optional(),
  
  floor: z.number()
    .int('Floor must be an integer')
    .min(1, 'Floor must be at least 1')
    .max(50, 'Floor cannot exceed 50')
    .optional(),
  
  customerCount: z.number()
    .int('Customer count must be an integer')
    .min(0, 'Customer count cannot be negative')
    .max(20, 'Customer count cannot exceed 20')
    .optional()
    .nullable(),
  
  orderStartTime: z.string()
    .datetime('Invalid datetime format')
    .optional()
    .nullable()
    .transform((val) => val ? new Date(val) : null)
});

// Get table by ID validation schema
export const getTableByIdSchema = z.object({
  id: z.string()
    .uuid('Invalid table ID format')
});

// Query parameters validation for get tables
export const getTablesQuerySchema = z.object({
  status: TableStatusEnum.optional(),
  size: TableSizeEnum.optional(),
  floor: z.string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().min(1).max(50))
    .optional(),
  page: z.string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().min(1))
    .optional()
    .default(() => 1),
  limit: z.string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().min(1).max(100))
    .optional()
    .default(() => 10)
});

// Delete table validation schema
export const deleteTableSchema = z.object({
  id: z.string()
    .uuid('Invalid table ID format')
});

// Type exports for use in controllers
export type CreateTableInput = z.infer<typeof createTableSchema>;
export type UpdateTableInput = z.infer<typeof updateTableSchema>;
export type GetTableByIdInput = z.infer<typeof getTableByIdSchema>;
export type GetTablesQueryInput = z.infer<typeof getTablesQuerySchema>;
export type DeleteTableInput = z.infer<typeof deleteTableSchema>;
