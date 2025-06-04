import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

export const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
  next();
});

app.get('/', async (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello World',
  });
});

app.get('/health', async (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
