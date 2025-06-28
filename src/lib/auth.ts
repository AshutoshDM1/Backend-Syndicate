import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../db';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const auth = betterAuth({
  baseURL: process.env.BASE_URL,
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
      },
    },
  },
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:2020',
    'https://frontend-syndicate.vercel.app',
    'https://pos-syndicate.elitedev.tech',
    'https://backend-syndicate.onrender.com',
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          console.log('Creating user with data:', userData);
          return {
            data: {
              ...userData,
              role: 'ADMIN',
            },
          };
        },
        after: async (user) => {
          console.log('User created:', user);
          //   create a customer
          const customer = await prisma.customer.create({
            data: {
              id: user.id,
              userId: user.id,
            },
          });
          console.log('customer created:', customer);
        },
      },
    },
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      secure: true, // Required for sameSite: "none"
      httpOnly: true,
      sameSite: 'none', // Allows cross-origin cookie sharing
      partitioned: false, // CRITICAL: Must be false for OAuth flows
      path: '/',
    },
  },
});
