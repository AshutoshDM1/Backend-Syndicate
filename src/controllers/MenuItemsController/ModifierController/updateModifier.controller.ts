import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { UpdateModifierInput } from './validation';

export const updateModifier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id }: UpdateModifierInput = req.params as unknown as UpdateModifierInput;
  const updateData: UpdateModifierInput = req.body as unknown as UpdateModifierInput;

  // Check if modifier exists
  const existingModifier = await prisma.modifier.findUnique({
    where: { id },
  });

  if (!existingModifier) {
    throw new ApiError(404, 'Modifier not found');
  }

  // If name is being updated, check for conflicts
  if (updateData.name) {
    const nameConflict = await prisma.modifier.findFirst({
      where: {
        name: updateData.name,
        id: { not: id }, // Exclude current modifier
      },
    });

    if (nameConflict) {
      throw new ApiError(409, `Modifier "${updateData.name}" already exists`);
    }
  }

  // Update the modifier
  const updatedModifier = await prisma.modifier.update({
    where: { id },
    data: updateData,
  });

  res.status(200).json(new ApiResponse(200, updatedModifier, 'Modifier updated successfully'));
});
