import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { GetComboMealByIdInput } from './validation';

export const getComboMealById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: GetComboMealByIdInput = req.params as unknown as GetComboMealByIdInput;

  const comboMeal = await prisma.comboMeal.findUnique({
    where: { id },
  });

  if (!comboMeal) {
    throw new ApiError(404, 'Combo meal not found');
  }

  res.status(200).json(new ApiResponse(200, comboMeal, 'Combo meal retrieved successfully'));
});
