# 1️⃣ Prune the monorepo to include only what's needed
FROM node:18 AS base

#==============================================================================
# STAGE 1
#==============================================================================
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# Set working directory
WORKDIR /app

# RUN npm i -g turbo@2.5.3

COPY . .
RUN npm ci
RUN npx turbo build --filter web


#FROM base AS installer

#WORKDIR /app

# First install the dependencies (as they change less often)
#COPY --from=builder /app/out/json/ .

#RUN npm install

# Build the project
#COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

#RUN npm run build


# Copy essential files
#COPY ./package.json package-lock.json turbo.json ./
#COPY apps/web/package.json ./apps/web/
#COPY packages ./packages
#COPY apps/web ./apps/web

# Prune the repo to only the web app and dependencies
#RUN npx turbo prune web --docker

# 2️⃣ Install dependencies in pruned project
#FROM node:18 AS deps

#WORKDIR /repo

#COPY --from=prune /repo/out/full .

#RUN npm install

# 3️⃣ Build the Next.js app
#FROM node:18 AS builder

#WORKDIR /repo

#COPY --from=deps /repo .

# RUN npm run build --workspace=web
# RUN npx turbo build --filter web

# 4️⃣ Create lightweight production image
FROM node:18-slim AS runner

# Setup environment
ENV NODE_ENV=production

WORKDIR /app

# Copy necessary output files
#COPY --from=builder /app/apps/web/next.config.js ./
#COPY --from=builder /app/apps/web/public ./public
#COPY --from=builder /app/apps/web/.next ./.next
#COPY --from=builder /app/apps/web/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
