import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { UpdateComboMealInput } from './validation';

export const updateComboMeal = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: UpdateComboMealInput = req.params as unknown as UpdateComboMealInput;
  const comboMealData: UpdateComboMealInput = req.body as unknown as UpdateComboMealInput;

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: comboMealData.categoryId }
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  if (!category.isActive) {
    throw new ApiError(400, 'Cannot update combo meal for inactive category');
  }

  // Check if combo meal with same name already exists in the category
  const existingComboMeal = await prisma.comboMeal.findFirst({
    where: {
      name: comboMealData.name,
    }
  });

  if (existingComboMeal) {
    throw new ApiError(409, `Combo meal "${comboMealData.name}" already exists in this category`);
  }

  // Update the combo meal
  const updatedComboMeal = await prisma.comboMeal.update({
    where: { id },
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
      updatedComboMeal,
      'Combo meal updated successfully'
    )
  );
}); 