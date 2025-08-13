# Use the official Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and necessary files
COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./

# Generate Prisma client and build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application and necessary files from base stage
COPY --from=base --chown=backend:nodejs /app/dist ./dist
COPY --from=base --chown=backend:nodejs /app/src ./src
COPY --from=base --chown=backend:nodejs /app/prisma ./prisma
COPY --from=base --chown=backend:nodejs /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=base --chown=backend:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Switch to non-root user
USER backend

# Expose the port the app runs on
EXPOSE 2020

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:2020/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "dist/index.js"]
