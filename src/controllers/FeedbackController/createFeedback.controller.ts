import { Request, Response } from 'express';
import { prisma } from '../../db';
import { Prisma } from '../../../prisma/generated/prisma';

const createFeedback = async (req: Request, res: Response) => {
  try {
    const { data }: { data: Prisma.FeedbackUncheckedCreateInput } = req.body;

    if (!data) {
      res.status(501).json({
        message: 'Invalid! body has missing or invalid params',
      });
      return;
    }
    const feedback = await prisma.feedback.create({
      data: data,
    });

    if (!feedback) {
      res.status(501).json({
        message: 'Operation failed',
      });
      return;
    }

    res.status(200).json({
      feedbacks: feedback,
      message: 'feedback created successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: 'internal server error',
    });
  }
};

export { createFeedback };
