import { Request, Response } from 'express';
import { prisma } from '../../db';
import { CreateTableInput } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export const createTable = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tableData: CreateTableInput = req.body;

  // Check if table number already exists
  const existingTable = await prisma.table.findFirst({
    where: {
      number: tableData.number,
      floor: tableData.floor,
    },
  });

  if (existingTable) {
    throw new ApiError(409, `Table ${tableData.number} already exists on floor ${tableData.floor}`);
  }

  // Create the table
  const newTable = await prisma.table.create({
    data: {
      number: tableData.number,
      status: tableData.status || 'AVAILABLE',
      size: tableData.size,
      floor: tableData.floor,
    },
  });

  res.status(201).json(new ApiResponse(201, newTable, 'Table created successfully'));
});
