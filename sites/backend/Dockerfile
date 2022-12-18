## Stage 1: Builder
FROM node:alpine as builder

## Set workdir
WORKDIR /backend

## Install build toolchain
#RUN apk add --no-cache python make g++

## Install node dependencies
COPY package* ./
RUN npm install pm2 && npm ci

## Build app
COPY package.json package.json
COPY src src
COPY build.mjs build.mjs
RUN npm run build

## Stage 2: App
FROM node:alpine as app

## Set workdir
WORKDIR /backend

## Copy built node modules and binaries without including the toolchain
COPY --from=builder /backend/node_modules/ /backend/node_modules/
COPY --from=builder /backend/build/ /backend/build/
COPY --from=builder /backend/package.json /backend/package.json

## Add a user to run the app
RUN addgroup -S freesewing \
  && adduser -S freesewing \
  && chown -R freesewing /backend

## Drop privleges and run app
USER freesewing
CMD ["./node_modules/.bin/pm2-runtime",  "./dist/index.mjs"]
