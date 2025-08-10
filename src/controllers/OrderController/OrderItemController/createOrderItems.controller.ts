import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiResponse } from '../../../utils/ApiResponse';
import { CreateOrderItemsInput } from './validation';

export const createOrderItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { orderId, menuItemId, comboMealId, quantity } = req.body as unknown as CreateOrderItemsInput;

  const order = await prisma.orderItem.create({
    data: {
      orderId,
      menuItemId,
      comboMealId,
      quantity,
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Order items created successfully'));
});
