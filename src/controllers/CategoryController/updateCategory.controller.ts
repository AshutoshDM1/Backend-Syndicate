import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';
import { UpdateCategoryInput } from './validation';

export const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: UpdateCategoryInput = req.params as unknown as UpdateCategoryInput;
  const updateData: UpdateCategoryInput = req.body as unknown as UpdateCategoryInput;

  // Check if category exists
  const existingCategory = await prisma.category.findUnique({
    where: { id }
  });

  if (!existingCategory) {
    throw new ApiError(404, 'Category not found');
  }

  // If name is being updated, check for conflicts
  if (updateData.name) {
    const nameConflict = await prisma.category.findFirst({
      where: {
        name: updateData.name,
        id: { not: id } // Exclude current category
      }
    });

    if (nameConflict) {
      throw new ApiError(409, `Category "${updateData.name}" already exists`);
    }
  }

  // Update the category
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: updateData,
    include: {
      _count: {
        select: {
          menuItems: true
        }
      }
    }
  });

  // Transform category to include item count
  const categoryWithCount = {
    ...updatedCategory,
    itemCount: updatedCategory._count.menuItems,
    _count: undefined
  };

  res.status(200).json(
    new ApiResponse(
      200,
      categoryWithCount,
      'Category updated successfully'
    )
  );
}); 