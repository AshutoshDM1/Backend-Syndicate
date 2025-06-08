// prototype-> const asyncHandler = () => { () => {} };
import { Request, Response, NextFunction } from 'express';
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error); // Log the error
      const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  };
