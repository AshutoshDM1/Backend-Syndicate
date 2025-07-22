import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';
import { GetCategoryByIdInput } from './validation';

export const getCategoryById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: GetCategoryByIdInput = req.params as GetCategoryByIdInput;

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      menuItems: {
        select: {
          id: true,
          name: true,
          price: true,
          isAvailable: true,
          image: true
        },
        orderBy: {
          sortOrder: 'asc'
        }
      },
      _count: {
        select: {
          menuItems: true
        }
      }
    }
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  // Transform category to include item count
  const categoryWithCount = {
    ...category,
    itemCount: category._count.menuItems,
    _count: undefined
  };

  res.status(200).json(
    new ApiResponse(
      200,
      categoryWithCount,
      'Category retrieved successfully'
    )
  );
}); 