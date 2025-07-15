import { Router } from 'express';
import controller from '../controllers/FeedbackController/index';

const feedbackRoutes = Router();

// only admin:
feedbackRoutes.get('/', controller.getFeedbacks); // get all the feedback lists
// only customer:
feedbackRoutes.post('/', controller.createFeedback); // customer can create a new feedback
// customer + admin:
feedbackRoutes.get('/:feedbackId', controller.getFeedbackById); // customer can view their own feedback
// admin can update resolution status:
feedbackRoutes.put('/update-feedback', controller.updateFeedback);
// only admin can delete (if in any case required):
feedbackRoutes.delete('/delete-feedback', controller.deleteFeedback);

export default feedbackRoutes;
