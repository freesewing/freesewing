FROM keymetrics/pm2:latest-alpine

# For documentation, see https://freesewing.dev/containers/backend

# Extra build argument for when you're using a private NPM registry
ARG npm_registry

# Environment variables
ENV http_proxy=$http_proxy \
    https_proxy=$https_proxy \
    no_proxy=$no_proxy \
    NPM_CONFIG_REGISTRY=$npm_registry \
    FS_BACKEND=$FS_BACKEND \
    FS_SITE=$FS_SITE \
    FS_MONGO_URI=$FS_MONGO_URI \
    FS_ENC_KEY=$FS_ENC_KEY \
    FS_JWT_ISSUER=$FS_JWT_ISSUER \
    FS_SMTP_HOST=$FS_SMTP_HOST \
    FS_SMTP_USER=$FS_SMTP_USER \
    FS_SMTP_PASS=$FS_SMTP_PASS \
    FS_GITHUB_CLIENT_ID=$FS_GITHUB_CLIENT_ID \
    FS_GITHUB_CLIENT_SECRET=$FS_GITHUB_CLIENT_SECRET \
    FS_GOOGLE_CLIENT_ID=$FS_GOOGLE_CLIENT_ID \
    FS_GOOGLE_CLIENT_SECRET=$FS_GOOGLE_CLIENT_SECRET \
    FS_STATIC=/storage/static \
    FS_STORAGE=/storage/api \
    NODE_ENV=production

# Install OS dependencies (needed to compile sharp)
RUN apk add git python make g++

# Create storage structure
RUN mkdir -p /storage/static && mkdir /storage/api && mkdir -p /backend/src

# Creat and set workdir
WORKDIR /backend

# Add user to run the app
RUN addgroup -S freesewing \
  && adduser -S freesewing -G freesewing \
  && chown -R freesewing .

# Copy source
COPY ./package.json .
COPY ./package-lock.json* .
COPY ./src ./src/

# Install Node.js dependencies (will also compile sharp)
RUN npm install && npm install -g backpack-core

# Build code
RUN backpack build

# Drop privleges and run app
USER freesewing
CMD pm2-runtime /backend/build/main.js
