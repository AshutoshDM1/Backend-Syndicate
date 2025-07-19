import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const deleteMenuItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if menu item exists
  const existingMenuItem = await prisma.menuItem.findUnique({
    where: { id },
    include: {
      orderItems: {
        select: { id: true }
      }
    }
  });

  if (!existingMenuItem) {
    throw new ApiError(404, 'Menu item not found');
  }

  // Check if menu item is used in any orders
  if (existingMenuItem.orderItems.length > 0) {
    throw new ApiError(400, 'Cannot delete menu item that has been ordered. Consider marking it as unavailable instead.');
  }

  // Delete the menu item (this will cascade delete related modifiers)
  await prisma.menuItem.delete({
    where: { id }
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Menu item deleted successfully'
    )
  );
}); 