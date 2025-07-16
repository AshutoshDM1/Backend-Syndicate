import { Router, Request, Response } from 'express';

const menuItemRoutes = Router();

menuItemRoutes.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

export default menuItemRoutes;