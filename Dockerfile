# Builder stage
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
