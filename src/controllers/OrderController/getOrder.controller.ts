import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { Prisma } from '../../../prisma/generated/prisma';
import { GetOrderInput } from './validation';

export const getOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as GetOrderInput;
  const { status, page = 1, limit = 10 } = query;

  // Build where clause
  const where: Prisma.OrderWhereInput = {};
  if (status) where.status = status;

  // Calculate pagination
  const skip = (page - 1) * limit;

  const total = await prisma.order.count({ where });

  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: [
      {
        orderTime: 'desc',
      },
    ],
    include: {
      table: true,
      orderItems: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Orders fetched successfully'
      )
    );
});
