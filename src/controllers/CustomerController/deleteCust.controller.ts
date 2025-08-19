import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';

const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  const customer = await prisma.customer.delete({
    where: {
      id: id,
    },
  });

  if (!customer) {
    throw new ApiError(404, `Failed to delete`);
  }

  res.status(200).json(new ApiResponse(200, customer, `Customer Data Deleted successfully`));
});

export { deleteCustomer };
