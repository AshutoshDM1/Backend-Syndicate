import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../db';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// const isProduction = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  cookies: {
    secure: false,
    sameSite: 'none',
    httpOnly: true,
    path: '/',
  },
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
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:2020',
    'https://frontend-syndicate.vercel.app',
    'https://pos-syndicate.elitedev.tech'
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          console.log("Creating user with data:", userData);
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
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
  },
});
