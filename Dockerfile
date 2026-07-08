# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm@9

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
