import { Request, Response } from 'express';
import { prisma } from '../../db';

const updateCustomer = async (req: Request, res: Response) => {
  const { id, data } = req.body;

  if (!id || !data) {
    res.status(501).json({
      message: 'Invalid! body has missing or invalid params',
    });
    return;
  }

  const customer = await prisma.customer.update({
    where: {
      id: id,
    },
    data: data,
  });

  res.status(200).json({
    customer: customer,
    message: 'Customer Data updated successfully',
  });
};

export { updateCustomer };
