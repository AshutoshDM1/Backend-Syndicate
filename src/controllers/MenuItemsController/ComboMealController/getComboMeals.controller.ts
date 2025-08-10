import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { asyncHandler } from '../../../utils/asyncHandler';
import { GetComboMealsQuery } from './validation';
import { Prisma } from '../../../../prisma/generated/prisma';

export const getComboMeals = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query: GetComboMealsQuery = req.query as unknown as GetComboMealsQuery;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // Build where clause for filtering   
  const where: Prisma.ComboMealWhereInput = {};

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
  const orderBy: Prisma.ComboMealOrderByWithRelationInput = {};
  if (query.sortBy && query.sortOrder) {
    orderBy[query.sortBy as keyof Prisma.ComboMealOrderByWithRelationInput] = query.sortOrder;
  } else {
    orderBy.name = 'asc';
  }

  // Get modifiers with pagination
  const [comboMeals, totalCount] = await Promise.all([
    prisma.comboMeal.findMany({
      where,
      orderBy,
      skip,
      take: limit
    }),
    prisma.comboMeal.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        comboMeals,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      'Combo meals retrieved successfully'
    )
  );
}); 