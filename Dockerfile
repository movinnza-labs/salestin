# Production image for the SELESTIN Professional website (Next.js + Payload), built for Railway.
# Debian slim, not Alpine: on Alpine, sharp keeps freed memory and the container keeps growing.
FROM node:22-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

# ── dependencies ────────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# ── build ───────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pages are pre-rendered from the database, so the build needs it. Railway's private
# network is not available while building, so the build gets the PUBLIC database URL
# in its own variable; the running app keeps using the private DATABASE_URL.
ARG BUILD_DATABASE_URL
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
RUN test -n "$BUILD_DATABASE_URL" || (echo "Set BUILD_DATABASE_URL (the public Postgres URL) on the Railway service" && exit 1)

# Migrations first: the build reads the new schema. They run once per deploy, not at server start.
RUN DATABASE_URL="$BUILD_DATABASE_URL" pnpm migrate
RUN DATABASE_URL="$BUILD_DATABASE_URL" pnpm build

# One-file seed script for the first content load (`node seed/seed.mjs` in the running container).
# Packages stay external (they are in the standalone node_modules); next/cache is not, so it is stubbed.
RUN pnpm exec esbuild src/seed/index.ts --bundle --platform=node --format=esm --target=node22 \
      --packages=external --alias:next/cache=./src/seed/next-cache-stub.ts --outfile=dist/seed/seed.mjs \
 && cp -r src/seed/images dist/seed/images

# ── runtime: only the standalone server ────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    # fewer glibc memory arenas: stops native memory growth from sharp
    MALLOC_ARENA_MAX=2

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/dist/seed ./seed

# Uploaded media is stored here: mount the Railway volume at /app/media.
RUN mkdir -p media && chown nextjs:nodejs media

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
