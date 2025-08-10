import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { CreateComboMealInput } from './validation';

export const createComboMeal = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const comboMealData: CreateComboMealInput = req.body as unknown as CreateComboMealInput;

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: comboMealData.categoryId }
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
      name: comboMealData.name,
      categoryId: comboMealData.categoryId
    }
  });

  if (existingMenuItem) {
    throw new ApiError(409, `Menu item "${comboMealData.name}" already exists in this category`);
  }

  // Create the menu item
  const newComboMeal = await prisma.comboMeal.create({
    data: {
      name: comboMealData.name,
      description: comboMealData.description,
      price: comboMealData.price,
      image: comboMealData.image,
      isAvailable: comboMealData.isAvailable ?? true,
    },

  });

  res.status(201).json(
    new ApiResponse(
      201,
        newComboMeal,
      'Combo meal created successfully'
    )
  );
}); 