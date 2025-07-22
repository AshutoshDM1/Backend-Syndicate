import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { GetCategoriesQuery } from './validation';
import { Prisma } from '../../../prisma/generated/prisma';

export const getCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query: GetCategoriesQuery = req.query as unknown as GetCategoriesQuery;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // Build where clause for filtering
  const where: Prisma.CategoryWhereInput = {};

  if (query.isActive !== undefined) {
    where.isActive = query.isActive;
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
  const orderBy: Prisma.CategoryOrderByWithRelationInput = {};
  if (query.sortBy && query.sortOrder) {
    orderBy[query.sortBy] = query.sortOrder;
  } else {
    orderBy.sortOrder = 'asc';
  }

  // Get categories with pagination
  const [categories, totalCount] = await Promise.all([
    prisma.category.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            menuItems: true
          }
        }
      }
    }),
    prisma.category.count({ where })
  ]);

  // Transform categories to include item count
  const categoriesWithCount = categories.map(category => ({
    ...category,
    itemCount: category._count.menuItems,
    _count: undefined
  }));

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        categories: categoriesWithCount,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      'Categories retrieved successfully'
    )
  );
}); 