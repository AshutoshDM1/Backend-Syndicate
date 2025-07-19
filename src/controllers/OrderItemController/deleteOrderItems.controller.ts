import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { DeleteOrderItemsInput } from './validation';

export const deleteOrderItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as DeleteOrderItemsInput;

  const order = await prisma.orderItem.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Order items deleted successfully'));
});
