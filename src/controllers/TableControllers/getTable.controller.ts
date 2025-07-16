import { Request, Response } from 'express';
import { prisma } from '../../db';
import { GetTablesQueryInput } from './validation'; 
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { Prisma } from '../../../prisma/generated/prisma';

export const getTable = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query = req.query as unknown as GetTablesQueryInput;
  const { status, size, floor, page = 1, limit = 10 } = query;

  // Build where clause
  const where: Prisma.TableWhereInput = {};
  if (status) where.status = status;
  if (size) where.size = size;
  if (floor) where.floor = floor;

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const total = await prisma.table.count({ where });

  // Get tables with pagination
  const tables = await prisma.table.findMany({
    where,
    skip,
    take: limit,
    orderBy: [{ floor: 'asc' }, { number: 'asc' }],
    include: {
      orders: {
        where: {
          status: {
            in: ['STARTED', 'IN_PROGRESS'],
          },
        },
        select: {
          id: true,
          customerName: true,
          orderTime: true,
          totalAmount: true,
          status: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tables, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Tables fetched successfully'
      )
    );
});
