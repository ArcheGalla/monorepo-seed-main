# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base


FROM base AS prune

WORKDIR /app

# The vertion should be the same as from root package json file
RUN npm install -g turbo@2.5.3
COPY . .
RUN npx turbo prune api --docker

FROM base AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY --from=prune /app/out/json .
COPY --from=prune /app/out/full .

RUN npm ci

# Rebuild the source code only when needed
# TODO: This can be optimazed by move install & copy source into separated docker stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app ./

RUN npx turbo build --filter api


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app .

# TODO: This can be optimazed to not load all the dependecies
# by introduce --omit flag and not copy all the stuff
# from previos stage
#RUN npm install --omit=dev

USER nestjs

EXPOSE 4000

ENV PORT=4000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/api/dist/src/main.js"]
