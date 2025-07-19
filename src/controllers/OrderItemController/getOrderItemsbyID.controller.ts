import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { GetOrderItemsByIdInput } from './validation';

export const getOrderItemsbyID = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as GetOrderItemsByIdInput;

  const order = await prisma.orderItem.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Order items fetched successfully'));
});
