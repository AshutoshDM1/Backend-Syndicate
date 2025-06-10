import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction, Application } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import indexRoutes from './routes/index.route';
dotenv.config({ path: '.env' });

export const app: Application = express();
const PORT = process.env.PORT || 2020;

app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-syndicate.vercel.app', 'https://backend-syndicate.onrender.com' , 'http://localhost:2020'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


// Middleware
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());


// Routes
app.use('/api/v1', indexRoutes);


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
app.get(['/', '/health'], async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
