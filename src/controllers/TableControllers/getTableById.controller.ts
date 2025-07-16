import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { GetTableByIdInput } from './validation';

export const getTableById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as GetTableByIdInput;
  const table = await prisma.table.findUnique({
    where: {
      id: id,
    },
  });

  res.status(201).json(new ApiResponse(201, table, 'Table by id fetched successfully'));
});
