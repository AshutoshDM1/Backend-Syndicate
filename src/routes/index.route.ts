import { Router } from 'express';
import { index } from '../controllers/index.controllers';

const indexRoutes = Router();

indexRoutes.get('/', index);

export default indexRoutes;
