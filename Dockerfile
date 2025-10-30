FROM node:20-alpine AS build
RUN corepack enable
RUN apk add --no-cache libc6-compat openssl3

WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma
RUN pnpm install

RUN pnpm prisma generate

COPY . .

RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma/src/generated ./prisma/src/generated

EXPOSE 3000
CMD ["node", "build"]
