import { z } from 'zod';
import { UserType } from '../../../prisma/generated/prisma';

export const UserTypeEnum = z.nativeEnum(UserType);
export const UserTypeWithAllEnum = z.enum([...UserTypeEnum.options, 'ALL']);

export const updateUserSchema = z.object({
  id: z.string(),
  role: UserTypeEnum,
});

export const userDetailTableSchema = z.object({
  role: UserTypeWithAllEnum,
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserDetailTableInput = z.infer<typeof userDetailTableSchema>;
