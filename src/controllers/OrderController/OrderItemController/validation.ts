import { z } from 'zod';
import { OrderStatus, PaymentMethod } from '../../../../prisma/generated/prisma';

export const OrderStatusEnum = z.nativeEnum(OrderStatus);
export const PaymentMethodEnum = z.nativeEnum(PaymentMethod);

export const createOrderItemsSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
  menuItemId: z.string().uuid('Invalid menu item ID format'),
  comboMealId: z.string().uuid('Invalid combo meal ID format'),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0, 'Unit price must be greater than 0'),
  totalPrice: z.number().min(0, 'Total price must be greater than 0'),
  notes: z.string().optional(),
});

export const updateOrderItemsSchema = z.object({
  id: z.string().uuid('Invalid order item ID format'),
  orderId: z.string().uuid('Invalid order ID format'),
  menuItemId: z.string().uuid('Invalid menu item ID format'),
  comboMealId: z.string().uuid('Invalid combo meal ID format'),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0, 'Unit price must be greater than 0'),
  totalPrice: z.number().min(0, 'Total price must be greater than 0'),
  notes: z.string().optional(),
});

export const getOrderItemsByIdSchema = z.object({
  id: z.string().uuid('Invalid order item ID format'),
});

export const getOrderItemsSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
});

export const deleteOrderItemsSchema = z.object({
  id: z.string().uuid('Invalid order item ID format'),
});

export type CreateOrderItemsInput = z.infer<typeof createOrderItemsSchema>;
export type GetOrderItemsInput = z.infer<typeof getOrderItemsSchema>;
export type GetOrderItemsByIdInput = z.infer<typeof getOrderItemsByIdSchema>;
export type UpdateOrderItemsInput = z.infer<typeof updateOrderItemsSchema>;
export type DeleteOrderItemsInput = z.infer<typeof deleteOrderItemsSchema>;