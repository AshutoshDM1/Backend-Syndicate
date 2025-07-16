import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { DeleteTableInput } from './validation';

export const deleteTable = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as DeleteTableInput;
  const table = await prisma.table.delete({
    where: {
      id: id,
    },
  });

  res.status(201).json(new ApiResponse(201, table, 'Table deleted successfully'));
});
