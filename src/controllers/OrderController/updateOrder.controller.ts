import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { PaymentMethod } from '../../../prisma/generated/prisma';
import { UpdateOrderInput } from './validation';

export const updateOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id, status, tableId, customerName, customerPhone, totalAmount, paymentMethod, orderItems } = req.body as unknown as UpdateOrderInput;

  const order = await prisma.order.update({
    where: { id },
    data: {
      tableId,
      customerName, 
      customerPhone,
      totalAmount,
      status,
      paymentMethod: paymentMethod as PaymentMethod,
      orderItems: {
        create: orderItems?.map((item) => ({ 
          menuItemId: item.menuItemId || '',
          comboMealId: item.comboMealId || '',
          quantity: item.quantity || 0,
        })),
      },
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Orders created successfully'));
});
