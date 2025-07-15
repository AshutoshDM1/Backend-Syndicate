import { Request, Response } from 'express';
import { prisma } from '../../db';
import { Prisma } from '../../../prisma/generated/prisma';

const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { id, data }:{ id:string, data:Prisma.FeedbackUpdateInput } = req.body;
    console.log(data);
    
    if (!id || !data) {
      res.status(501).json({
        message: 'Invalid! body has missing or invalid params',
      });
      return;
    }

    const feedback = await prisma.feedback.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!feedback) {
      res.status(501).json({
        message: 'Operation failed',
      });
      return;
    }

    res.status(200).json({
      feedback: feedback,
      message: 'Feedback updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: 'internal server error',
    });
  }
};

export { updateFeedback };
