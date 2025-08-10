import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { ApiResponse } from '../../../utils/ApiResponse'; 
import { ApiError } from '../../../utils/ApiError';
import { asyncHandler } from '../../../utils/asyncHandler';
import { CreateCategoryInput } from './validation';

export const createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const categoryData: CreateCategoryInput = req.body;

  // Check if category with same name already exists
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: categoryData.name
    }
  });

  if (existingCategory) {
    throw new ApiError(409, `Category "${categoryData.name}" already exists`);
  }

  // Create the category
  const newCategory = await prisma.category.create({
    data: {
      name: categoryData.name,
      description: categoryData.description,
      sortOrder: categoryData.sortOrder ?? 0
    }
  });

  res.status(201).json(
    new ApiResponse(
      201,
      newCategory,
      'Category created successfully'
    )
  );
}); 