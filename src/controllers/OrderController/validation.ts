import { z } from 'zod';
import { OrderStatus, PaymentMethod } from '../../../prisma/generated/prisma';

export const OrderStatusEnum = z.nativeEnum(OrderStatus);
export const PaymentMethodEnum = z.nativeEnum(PaymentMethod);

export const createOrderSchema = z.object({
  tableId: z.string().uuid('Invalid table ID format'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().min(1, 'Customer phone is required'),
  totalAmount: z.number().min(0, 'Total amount must be greater than 0'),
  status: OrderStatusEnum.optional(),
  paymentMethod: PaymentMethodEnum.optional(),
  orderItems: z.array(z.object({
    menuItemId: z.string().uuid('Invalid menu item ID format').optional(),
    comboMealId: z.string().uuid('Invalid combo meal ID format').optional(),
    quantity: z.number().int().min(1),
  })),
});

export const updateOrderSchema = z.object({
  id: z.string().uuid('Invalid order ID format'),
  status: OrderStatusEnum.optional(),
  tableId: z.string().uuid('Invalid table ID format').optional(),
  customerName: z.string().min(1, 'Customer name is required').optional(),
  customerPhone: z.string().min(1, 'Customer phone is required').optional(),
  totalAmount: z.number().min(0, 'Total amount must be greater than 0').optional(),
  paymentMethod: PaymentMethodEnum.optional(),
  orderItems: z.array(z.object({
    menuItemId: z.string().uuid('Invalid menu item ID format').optional(),
    comboMealId: z.string().uuid('Invalid combo meal ID format').optional(),
    quantity: z.number().int().min(1).optional(),
  })).optional(),
});


export const getOrderByIdSchema = z.object({
  id: z.string()
    .uuid('Invalid order ID format')
});

export const getOrderSchema = z.object({
  status: OrderStatusEnum.optional(),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().min(1))
    .optional()
    .default(() => 1),
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().min(1).max(100))
    .optional()
    .default(() => 10),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type GetOrderInput = z.infer<typeof getOrderSchema>;
export type GetOrderByIdInput = z.infer<typeof getOrderByIdSchema>; 
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;