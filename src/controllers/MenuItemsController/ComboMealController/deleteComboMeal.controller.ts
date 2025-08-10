import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { DeleteComboMealInput } from './validation';

export const deleteComboMeal = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } :DeleteComboMealInput = req.params as unknown as DeleteComboMealInput;

  // Check if combo meal exists
  const existingComboMeal = await prisma.comboMeal.findUnique({
    where: { id },
    include: {
      orderItems: {
        select: { id: true }
      }
    }
  });

  if (!existingComboMeal) {
    throw new ApiError(404, 'Combo meal not found');
  }

  // Check if combo meal is used in any orders
  if (existingComboMeal.orderItems.length > 0) {
    throw new ApiError(400, 'Cannot delete combo meal that has been ordered. Consider marking it as unavailable instead.');
  }

  // Delete the combo meal (this will cascade delete related modifiers)
  await prisma.comboMeal.delete({
    where: { id }
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Combo meal deleted successfully'
    )
  );
}); 