import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { UpdateCustomerInput } from './validation';

const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const body: UpdateCustomerInput = req.body;
  const { id, ...rest } = body;

  const customer = await prisma.customer.update({
    where: {
      id: id,
    },
    data: rest,
  });

  if (!customer) {
    new ApiError(404, `Failed to update!`);
  }

  res.status(200).json(new ApiResponse(201, customer, `Customer Data updated successfully`));
});

export { updateCustomer };
