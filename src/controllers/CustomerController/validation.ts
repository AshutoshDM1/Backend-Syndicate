import { z } from 'zod';
import { PaymentMethod } from '../../../prisma/generated/prisma';

export const PaymentMethodEnum = z.nativeEnum(PaymentMethod);

// Get Customer by ID validation schema
export const getCustomerByIdSchema = z.object({
  id: z.string().length(32, 'Invalid customer ID format'),
});

// Get All Customers Query validation schema
export const getAllCustomerSchema = z.object({});

/** COMMENT OR UNCOMMENT PROPERTIES ALLOWED TO UPDATE */
// Update validation schema
export const updateCustomerSchema = z.object({
  id: z.string().length(32, 'Invalid customer ID format'),
  preferredPaymentMethod: PaymentMethodEnum.optional(),
  //   lastOrderDate: z.coerce
  //     .date({
  //       message: 'Invalid date format. Please use ISO 8601 format.',
  //     })
  //     .optional(),
  totalOrdersCount: z.int().optional(),
  totalSpent: z.number().min(1, 'Spent cannot be 0 or less').optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
});

// Delete Customers by id validation schema
export const deleteCustomerSchema = z.object({
  id: z.string().length(32, 'Invalid customer ID format'),
});

// Type exports for use in controllers
export type GetCustomerByIdInput = z.infer<typeof getCustomerByIdSchema>;
export type GetAllCustomerInput = z.infer<typeof getAllCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type DeleteCustomerInput = z.infer<typeof deleteCustomerSchema>;
