FROM keymetrics/pm2:latest-alpine

# For documentation, see https://freesewing.dev/containers/backend

# Arguments for users running this in a corporate environment
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
# Arguments to configure the backend
ARG FS_BACKEND
ARG FS_SITE
ARG FS_MONGO_URI
ARG FS_ENC_KEY
ARG FS_JWT_ISSUER
ARG FS_SMTP_HOST
ARG FS_SMTP_USER
ARG FS_SMTP_PASS
ARG FS_GITHUB_CLIENT_ID
ARG FS_GITHUB_CLIENT_SECRET
ARG FS_GOOGLE_CLIENT_ID
ARG FS_GOOGLE_CLIENT_SECRET

# Environment variables
ENV http_proxy $http_proxy
ENV https_proxy $https_proxy
ENV no_proxy $no_proxy
ENV NPM_CONFIG_REGISTRY $npm_registry
ENV FS_BACKEND=$FS_BACKEND
ENV FS_SITE=$FS_SITE
ENV FS_MONGO_URI=$FS_MONGO_URI
ENV FS_ENC_KEY=$MONGO_ENC_KEY
ENV FS_JWT_ISSUER=$JWT_ISSUER
ENV FS_SMTP_HOST=$SMTP_HOST
ENV FS_SMTP_USER=$SMTP_USER
ENV FS_SMTP_PASS=$SMTP_PASS
ENV FS_GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV FS_GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV FS_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV FS_GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NODE_ENV production

# Fetch backend code
RUN mkdir /backend
WORKDIR /backend

# Install dependencies
RUN apk --no-cache --virtual build-dependencies \
  add git python make g++ \
  && git clone  --depth 1 https://github.com/freesewing/backend.git -b master . \
  && npm install \
  && npm install --global backpack-core \
  && apk del build-dependencies

# Storage (To alter these, mount a volume)
ENV FS_STATIC=/storage/static
ENV FS_STORAGE=/storage/api
RUN mkdir -p /storage/static && mkdir /storage/api

# Add user to run the app
RUN addgroup -S freesewing \
  && adduser -S freesewing -G freesewing \
  && chown -R freesewing /backend

# Drop privleges and run app
USER freesewing
CMD npm run build && pm2-runtime build/main.js
