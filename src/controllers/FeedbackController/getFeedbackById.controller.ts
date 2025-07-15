import { Request, Response } from 'express';
import { prisma } from '../../db';

const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const { include } = req.query; // ?include=customerId,feedbackType,overallRating

    if (!feedbackId) {
      res.status(501).json({
        message: 'invalid or missing params',
      });
      return;
    }

    let selectFields: { [x: string]: boolean } = {
      id: true,
      customerId: true,
      feedbackType: true,
      overallRating: true,
      foodQualityRating: true,
      serviceRating: true,
      deliveryRating: true,
      valueForMoneyRating: true,
      feedbackText: true,
      photos: true,
      status: true,
      priority: true,
      categoryTags: true,
      isPublic: true,
      responseText: true,
      respondedBy: true,
      respondedAt: true,
      resolutionStatus: true,
      createdAt: true,
      updatedAt: true,
      customer: false,
    };

    if (include && typeof include === 'string') {
      // Parse the comma-separated include parameter
      const requestedFields = include.split(',').map((field) => field.trim());

      for (const [key, _] of Object.entries(selectFields)) {
        selectFields[key] = false;
        if (requestedFields.includes(key)) {
          selectFields[key] = true;
        }
      }
      //  make sure id and customer id is included default:
      selectFields['id'] = true;
      selectFields['customerId'] = true;
    }

    const feedback = await prisma.feedback.findFirst({
      where: {
        id: feedbackId,
      },
      select: selectFields,
    });
    if (!feedback) {
      res.status(501).json({
        message: 'Operation failed',
      });
      return;
    }

    res.status(200).json({
      feedback: feedback,
      message: 'feedback fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: 'internal server error',
    });
  }
};

export { getFeedbackById };
