import { Request, Response } from 'express';
import { prisma } from '../../db';

const deleteFeedback = async (req: Request, res: Response) => {
  const { id }: { id: string } = req.body;

  if (!id) {
    res.status(501).json({
      message: 'Invalid! body has missing or invalid params',
    });
    return;
  }

  const feedback = await prisma.feedback.delete({
    where: {
      id: id,
    },
  });

  if (!feedback) {
    res.status(501).json({
      message: 'Operation failed',
    });
    return;
  }

  res.status(200).json({
    feedback: feedback,
    message: 'Feedback Deleted successfully',
  });
};

export { deleteFeedback };
