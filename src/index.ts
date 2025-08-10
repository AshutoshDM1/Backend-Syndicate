import type { Request, Response, NextFunction, Application } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import userRoutes from './routes/user.route';
import customerRoutes from './routes/customer.route';
import { swaggerUi, specs } from './config/swagger';
import tableRoutes from './routes/table.route';
import categoryRoutes from './routes/MenuItemRoutes/category.route';
import modifierRoutes from './routes/MenuItemRoutes/modifier.route';
import comboMealsRouter from './routes/MenuItemRoutes/comboMeals.route';
import orderRoutes from './routes/OrderRoutes/order.route';
import menuItemRoutes from './routes/MenuItemRoutes/menuItem.route';
import orderItemRoutes from './routes/OrderRoutes/orderItem.route';
dotenv.config({ path: '.env' });

export const app: Application = express();
const PORT = process.env.PORT || 2020;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:2020',
      'https://frontend-syndicate.vercel.app',
      'https://pos-syndicate.elitedev.tech',
      'https://backend-syndicate.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie', 'X-Requested-With'],
  })
);

// Middleware
app.all('/api/auth/*', toNodeHandler(auth));
app.use(express.json());

// Swagger API Documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Backend Syndicate API Documentation',
  })
);

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/tables', tableRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/menu-items', menuItemRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/modifiers', modifierRoutes);
app.use('/api/v1/combo-meals', comboMealsRouter);
app.use('/api/v1/order-items', orderItemRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
  next();
});

// Health check
app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`Swagger API Documentation: http://localhost:${PORT}/api-docs`);
});
