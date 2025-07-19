import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { Prisma } from '../../../prisma/generated/prisma';
import { GetOrderByIdInput } from './validation';

export const getOrderbyID = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as unknown as GetOrderByIdInput;

  // Build where clause
  const where: Prisma.OrderWhereUniqueInput = {
    id: id,
  };

  const order = await prisma.order.findUnique({
    where,
    include: {
      table: true,
      orderItems: true,
    },
  });
  res.status(200).json(new ApiResponse(200, { order }, 'Orders fetched successfully'));
});
