import { Request, Response } from 'express';
import { prisma } from '../../db';

const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(501).json({
      message: 'Invalid! body has missing or invalid params',
    });
    return;
  }

  const customer = await prisma.customer.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    customer: customer,
    message: 'Customer Data Deleted successfully',
  });
};

export { deleteCustomer };
