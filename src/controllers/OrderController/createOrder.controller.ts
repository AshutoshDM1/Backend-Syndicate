import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { PaymentMethod } from '../../../prisma/generated/prisma';
import { CreateOrderInput } from './validation';

export const createOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { tableId, customerName, customerPhone, totalAmount, status, paymentMethod, orderItems  } =
    req.body as unknown as CreateOrderInput;
  
  const order = await prisma.order.create({
    data: {
      tableId,
      customerName,
      customerPhone,
      totalAmount,
      status,
      paymentMethod: paymentMethod as PaymentMethod,
      orderItems: {
        create: orderItems.map((item) => ({
          menuItemId: item.menuItemId,
          comboMealId: item.comboMealId,
          quantity: item.quantity,
        })),
      },
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Orders created successfully'));
});
