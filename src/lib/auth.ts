import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../db';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';


dotenv.config();

export const auth = betterAuth({
  callbackURL: 'http://localhost:5173/dashboard',
  baseURL: 'http://localhost:2020',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 10);
      },
      verify: async ({ hash, password }) => {
        return await bcrypt.compare(password, hash);
      }
    },
  },
  trustedOrigins: ['http://localhost:2020', 'http://localhost:5173'],
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          console.log("Creating user with data:", userData);
          // Add required role field for every user
          return { 
            data: { 
              ...userData, 
              role: 'ADMIN'
            } 
          };
        },
        after: async (user) => {
          console.log("User created:", user);
        }
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
});
