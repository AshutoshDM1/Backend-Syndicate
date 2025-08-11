import { Request, Response } from 'express';
import { prisma } from '../../db';
import { CreateMenuItemInput } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const createMenuItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const menuItemData: CreateMenuItemInput = req.body;

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: menuItemData.categoryId },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  if (!category.isActive) {
    throw new ApiError(400, 'Cannot create menu item for inactive category');
  }

  // Check if menu item with same name already exists in the category
  const existingMenuItem = await prisma.menuItem.findFirst({
    where: {
      name: menuItemData.name,
      categoryId: menuItemData.categoryId,
    },
  });

  if (existingMenuItem) {
    throw new ApiError(409, `Menu item "${menuItemData.name}" already exists in this category`);
  }

  // Create the menu item
  const newMenuItem = await prisma.menuItem.create({
    data: {
      name: menuItemData.name,
      description: menuItemData.description,
      price: menuItemData.price,
      image: menuItemData.image,
      categoryId: menuItemData.categoryId,
      isAvailable: menuItemData.isAvailable ?? true,
      rating: menuItemData.rating,
      prepTime: menuItemData.prepTime,
      calories: menuItemData.calories,
      isVegetarian: menuItemData.isVegetarian ?? false,
      isVegan: menuItemData.isVegan ?? false,
      isGlutenFree: menuItemData.isGlutenFree ?? false,
      isSpicy: menuItemData.isSpicy ?? false,
      sortOrder: menuItemData.sortOrder ?? 0,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.status(201).json(new ApiResponse(201, newMenuItem, 'Menu item created successfully'));
});
