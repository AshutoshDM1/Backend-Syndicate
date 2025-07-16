import { Request, Response } from 'express';
import { prisma } from '../../db';
import { UpdateUserInput } from './validation';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { UserType } from '../../../prisma/generated/prisma';

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id, role } = req.body as unknown as UpdateUserInput;

  const user = await prisma.user.update({
    where: { id: id },
    data: { role: role as UserType },
  });

  res.status(200).json(new ApiResponse(200, { user }, 'User updated successfully'));
});
