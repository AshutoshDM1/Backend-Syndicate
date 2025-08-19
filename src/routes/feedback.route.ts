import { Router } from 'express';
import {
  getFeedbacks,
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from '../controllers/FeedbackController/index';

const feedbackRoutes = Router();

// only admin:
feedbackRoutes.get('/', getFeedbacks); // get all the feedback lists
// only customer:
feedbackRoutes.post('/', createFeedback); // customer can create a new feedback
// customer + admin:
feedbackRoutes.get('/:feedbackId', getFeedbackById); // customer can view their own feedback
// admin can update resolution status:
feedbackRoutes.put('/update-feedback', updateFeedback);
// only admin can delete (if in any case required):
feedbackRoutes.delete('/delete-feedback', deleteFeedback);

export default feedbackRoutes;
