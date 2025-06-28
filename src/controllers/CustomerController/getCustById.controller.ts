import { Request, Response } from 'express';
import { prisma } from '../../db';

const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const customer = await prisma.customer.findFirst({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          name: true, // Include the 'name' field
          email: true, // Include the 'email' field
        },
      },
    },
  });

  res.status(200).json({
    customer: customer,
    message: 'Customer data fetched successfully',
  });
};

export { getCustomerById };
