import { Router } from 'express';
import { userDetailTable } from '../controllers/UserControllers/user.controller';
import { updateUser } from '../controllers/UserControllers/updateUser.controller';

const userRoutes = Router();

userRoutes.get('/user-detail-table', userDetailTable);
userRoutes.put('/update-user', updateUser);

export default userRoutes;
