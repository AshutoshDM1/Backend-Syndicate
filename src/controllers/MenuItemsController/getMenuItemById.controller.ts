import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';
import { GetMenuItemByIdInput } from './validation';

export const getMenuItemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: GetMenuItemByIdInput = req.params as unknown as GetMenuItemByIdInput;

  const menuItem = await prisma.menuItem.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      modifiers: {
        include: {
          modifier: {
            select: {
              id: true,
              name: true,
              price: true,
              type: true,
              description: true,
              isAvailable: true,
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });

  if (!menuItem) {
    throw new ApiError(404, 'Menu item not found');
  }

  res.status(200).json(new ApiResponse(200, menuItem, 'Menu item retrieved successfully'));
});
