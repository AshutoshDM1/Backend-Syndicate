import { Request, Response } from 'express';
import { prisma } from '../../db';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const getCustomerDetails = asyncHandler(async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany({
    where: {},
  });

  const totalCustomers = await prisma.customer.count({
    where: {},
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        customers,
        // TODO LATER: pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        total: totalCustomers,
      },
      'Customers data fetched successfully'
    )
  );
});

export { getCustomerDetails };
