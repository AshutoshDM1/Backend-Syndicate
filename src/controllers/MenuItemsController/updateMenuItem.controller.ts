import { Request, Response } from 'express';
import { prisma } from '../../db';
import { UpdateMenuItemInput } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const updateMenuItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData: UpdateMenuItemInput = req.body;

  // Check if menu item exists
  const existingMenuItem = await prisma.menuItem.findUnique({
    where: { id }
  });

  if (!existingMenuItem) {
    throw new ApiError(404, 'Menu item not found');
  }

  // If categoryId is being updated, check if the new category exists and is active
  if (updateData.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: updateData.categoryId }
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    if (!category.isActive) {
      throw new ApiError(400, 'Cannot move menu item to inactive category');
    }
  }

  // If name is being updated, check for conflicts within the category
  if (updateData.name) {
    const categoryId = updateData.categoryId || existingMenuItem.categoryId;
    const nameConflict = await prisma.menuItem.findFirst({
      where: {
        name: updateData.name,
        categoryId: categoryId,
        id: { not: id } // Exclude current item
      }
    });

    if (nameConflict) {
      throw new ApiError(409, `Menu item "${updateData.name}" already exists in this category`);
    }
  }

  // Update the menu item
  const updatedMenuItem = await prisma.menuItem.update({
    where: { id },
    data: updateData,
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
  });

  res.status(200).json(
    new ApiResponse(
      200,
      updatedMenuItem,
      'Menu item updated successfully'
    )
  );
}); 