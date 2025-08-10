import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { DeleteModifierInput } from './validation';

export const deleteModifier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: DeleteModifierInput = req.params as unknown as DeleteModifierInput;

  // Check if modifier exists
  const existingModifier = await prisma.modifier.findUnique({
    where: { id },
    include: {
      menuItems: {
        select: { menuItemId: true }
      },
      orderItemModifiers: {
        select: { orderItemId: true }
      }
    }
  });

  if (!existingModifier) {
    throw new ApiError(404, 'Modifier not found');
  }

  // Check if modifier is used in any menu items or orders
  if (existingModifier.menuItems.length > 0) {
    throw new ApiError(400, 'Cannot delete modifier that is assigned to menu items. Please remove it from all menu items first.');
  }

  if (existingModifier.orderItemModifiers.length > 0) {
    throw new ApiError(400, 'Cannot delete modifier that has been used in orders. Consider marking it as unavailable instead.');
  }

  // Delete the modifier
  await prisma.modifier.delete({
    where: { id }
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Modifier deleted successfully'
    )
  );
}); 