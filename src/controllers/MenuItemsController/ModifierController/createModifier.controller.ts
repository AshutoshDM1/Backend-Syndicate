import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { CreateModifierInput } from './validation';

export const createModifier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const modifierData: CreateModifierInput = req.body as unknown as CreateModifierInput;

  // Check if modifier with same name already exists
  const existingModifier = await prisma.modifier.findFirst({
    where: {
      name: modifierData.name,
    },
  });

  if (existingModifier) {
    throw new ApiError(409, `Modifier "${modifierData.name}" already exists`);
  }

  // Create the modifier
  const newModifier = await prisma.modifier.create({
    data: {
      name: modifierData.name,
      price: modifierData.price ?? 0,
      type: modifierData.type,
      description: modifierData.description,
      isAvailable: modifierData.isAvailable ?? true,
    },
  });

  res.status(201).json(new ApiResponse(201, newModifier, 'Modifier created successfully'));
});
