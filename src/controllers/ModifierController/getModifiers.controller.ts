import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { GetModifiersQuery } from './validation';
import { Prisma } from '../../../prisma/generated/prisma';

export const getModifiers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query: GetModifiersQuery = req.query as unknown as GetModifiersQuery;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // Build where clause for filtering
  const where: Prisma.ModifierWhereInput = {};

  if (query.type) {
    where.type = query.type;
  }

  if (query.isAvailable !== undefined) {
    where.isAvailable = query.isAvailable;
  }

  if (query.search) {
    where.OR = [
      {
        name: {
          contains: query.search,
          mode: 'insensitive'
        }
      },
      {
        description: {
          contains: query.search,
          mode: 'insensitive'
        }
      }
    ];
  }

  // Build orderBy clause
  const orderBy: Prisma.ModifierOrderByWithRelationInput = {};
  if (query.sortBy && query.sortOrder) {
    orderBy[query.sortBy] = query.sortOrder;
  } else {
    orderBy.name = 'asc';
  }

  // Get modifiers with pagination
  const [modifiers, totalCount] = await Promise.all([
    prisma.modifier.findMany({
      where,
      orderBy,
      skip,
      take: limit
    }),
    prisma.modifier.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        modifiers,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      'Modifiers retrieved successfully'
    )
  );
}); 