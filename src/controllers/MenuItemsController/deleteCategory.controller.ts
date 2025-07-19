import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if category exists
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    include: {
      menuItems: {
        select: { id: true }
      }
    }
  });

  if (!existingCategory) {
    throw new ApiError(404, 'Category not found');
  }

  // Check if category has menu items
  if (existingCategory.menuItems.length > 0) {
    throw new ApiError(400, 'Cannot delete category that contains menu items. Please move or delete all menu items first.');
  }

  // Delete the category
  await prisma.category.delete({
    where: { id }
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Category deleted successfully'
    )
  );
}); 