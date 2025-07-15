import { Request, Response } from 'express';
import { prisma } from '../../db';

const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {},
    });

    const total = await prisma.feedback.count({
      where: {},
    });

    res.status(200).json({
      feedbacks: feedbacks,
      total: total,
      message: 'feedback data fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: 'internal server error',
    });
  }
};

export { getFeedbacks };
