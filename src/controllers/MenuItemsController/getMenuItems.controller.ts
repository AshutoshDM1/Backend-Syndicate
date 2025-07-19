import { Request, Response } from 'express';
import { prisma } from '../../db';
import { GetMenuItemsQuery } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export const getMenuItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query: GetMenuItemsQuery = req.query as any;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  // Build where clause for filtering
  const where: any = {};

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.isAvailable !== undefined) {
    where.isAvailable = query.isAvailable;
  }

  if (query.isVegetarian !== undefined) {
    where.isVegetarian = query.isVegetarian;
  }

  if (query.isVegan !== undefined) {
    where.isVegan = query.isVegan;
  }

  if (query.isGlutenFree !== undefined) {
    where.isGlutenFree = query.isGlutenFree;
  }

  if (query.isSpicy !== undefined) {
    where.isSpicy = query.isSpicy;
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
  const orderBy: any = {};
  if (query.sortBy && query.sortOrder) {
    orderBy[query.sortBy] = query.sortOrder;
  } else {
    orderBy.sortOrder = 'asc';
  }

  // Get menu items with pagination
  const [menuItems, totalCount] = await Promise.all([
    prisma.menuItem.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        modifiers: {
          include: {
            modifier: {
              select: {
                id: true,
                name: true,
                price: true,
                type: true
              }
            }
          },
          orderBy: {
            sortOrder: 'asc'
          }
        }
      }
    }),
    prisma.menuItem.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        menuItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      'Menu items retrieved successfully'
    )
  );
}); 