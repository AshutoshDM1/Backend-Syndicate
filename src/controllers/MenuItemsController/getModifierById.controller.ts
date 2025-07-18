import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const getModifierById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const modifier = await prisma.modifier.findUnique({
    where: { id },
    include: {
      menuItems: {
        include: {
          menuItem: {
            select: {
              id: true,
              name: true,
              category: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!modifier) {
    throw new ApiError(404, 'Modifier not found');
  }

  res.status(200).json(
    new ApiResponse(
      200,
      modifier,
      'Modifier retrieved successfully'
    )
  );
}); 