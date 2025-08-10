import { Request, Response } from 'express';
import { prisma } from '../../db';
import { UpdateTableInput } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export const updateTable = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tableData: UpdateTableInput = req.body;

  // Update the table
  const newTable = await prisma.table.update({
    data: {
      ...tableData,
    },
    where: {
      id: tableData.id,
    },
  });

  res.status(201).json(new ApiResponse(201, newTable, 'Table updated successfully'));
});
