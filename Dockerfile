# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.13
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Bun/Prisma"
COPY node /usr/local/bin
# Bun/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install

RUN touch .env
RUN --mount=type=secret,id=WALLET_CONNECT_DOMAIN_VERIFICATION,target=/run/secrets/WALLET_CONNECT_DOMAIN_VERIFICATION \
--mount=type=secret,id=APP_URL,target=/run/secrets/APP_URL 
  echo "\nWALLET_CONNECT_DOMAIN_VERIFICATION=$(cat /run/secrets/WALLET_CONNECT_DOMAIN_VERIFICATION)" >> .env
RUN echo "\nAPP_URL=$(cat /run/secrets/APP_URL)" >> .env
RUN --mount=type=secret,id=ALCHEMY_API_KEY,target=/run/secrets/ALCHEMY_API_KEY echo "\nALCHEMY_API_KEY=$(cat /run/secrets/ALCHEMY_API_KEY)" >> .env
RUN --mount=type=secret,id=WALLET_CONNECT_PROJECT_ID,target=/run/secrets/WALLET_CONNECT_PROJECT_ID echo "\nWALLET_CONNECT_PROJECT_ID=$(cat /run/secrets/WALLET_CONNECT_PROJECT_ID)" >> .env

# Generate Prisma Client
COPY --link prisma .
RUN bunx prisma generate

# Copy application code
COPY --link . .


# Build application
RUN bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Setup sqlite3 on a separate volume
RUN mkdir -p /data
VOLUME /data

# Entrypoint prepares the database.
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV DATABASE_URL="file:///data/sqlite.db"
CMD [ "bun", "run", "start" ]
