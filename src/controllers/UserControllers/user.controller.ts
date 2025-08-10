import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { UserDetailTableInput } from './validation';
import { UserType } from '../../../prisma/generated/prisma';

export const userDetailTable = asyncHandler(async (req: Request, res: Response) => {
  let { role } = req.query as unknown as UserDetailTableInput;

  if (!role) {
    role = 'ALL';
  }
  if (role === 'ALL') {
    const users = await prisma.user.findMany();
    res
      .status(200)
      .json(new ApiResponse(200, { users, role }, 'User detail table fetched successfully'));
  } else {
    const users = await prisma.user.findMany({
      where: {
        role: role as UserType,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, { users, role }, 'User detail table fetched successfully'));
  }
});
