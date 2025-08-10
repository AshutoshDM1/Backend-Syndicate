import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiResponse } from '../../../utils/ApiResponse';
import { GetOrderItemsInput } from './validation';

export const getOrderItemsOrderID = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params as unknown as GetOrderItemsInput;

  const order = await prisma.orderItem.findMany({
    where: {
      orderId: orderId,
    },
    include: {
      order: true,
      menuItem: true,
      comboMeal: true,
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Orders fetched successfully'));
});
