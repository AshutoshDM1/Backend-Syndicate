import { Request, Response } from 'express';
import { prisma } from '../../db';

const getCustomerDetails = async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany({
    where: {},
  });

  const totalCustomers = await prisma.customer.count({
    where: {},
  });

  res.status(200).json({
    customers: customers,
    totalCustomers: totalCustomers,
    message: 'Customer data fetched successfully',
  });
};

export { getCustomerDetails };
