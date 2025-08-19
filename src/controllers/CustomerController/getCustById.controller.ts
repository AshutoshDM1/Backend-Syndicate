import { Request, Response } from 'express';
import { prisma } from '../../db';
import { asyncHandler } from '../../utils/asyncHandler';
import { GetCustomerByIdInput } from './validation';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';

const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as GetCustomerByIdInput;

  const customer = await prisma.customer.findFirst({
    where: {
      id: id,
    },
    // include: {
    //   user: {
    //     select: {
    //       name: true, // Include the 'name' field
    //       email: true, // Include the 'email' field
    //     },
    //   },
    // },
  });

  if (!customer) {
    throw new ApiError(404, `Data not found!`);
  }

  res.status(200).json(new ApiResponse(200, customer, 'Customer data fetched successfully'));
});

export { getCustomerById };
