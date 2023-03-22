## Stage 1: Builder
FROM node:16.15-slim as builder

## Set workdir
WORKDIR /backend

## Install node dependencies
COPY package* ./
COPY prisma .
RUN apt-get update && apt-get install -y openssl
RUN npm install pm2 && npm ci
RUN npx prisma generate

## Build app
COPY package.json package.json
COPY src src
COPY prisma prisma
COPY local-config.mjs local-config.mjs
COPY build.mjs build.mjs
RUN npm run build

## Stage 2: App
FROM node:16.15-slim as app

## Set workdir
WORKDIR /backend

## Copy built node modules and binaries without including the toolchain
COPY --from=builder /backend/node_modules/ /backend/node_modules/
COPY --from=builder /backend/dist/ /backend/dist/
COPY --from=builder /backend/package.json /backend/package.json
COPY --from=builder /backend/prisma /backend
COPY --from=builder /backend/prisma/schema.sqlite /backend/db.sqlite
COPY --from=builder /backend/local-config.mjs /backend/
RUN mkdir -p /backend/src/landing
COPY --from=builder /backend/src/landing/* /backend/src/landing/

## Add a user to run the app
RUN useradd --home-dir /backend --comment FreeSewing --no-create-home --uid 2000 freesewing
RUN chown -R freesewing /backend

## Drop privleges and run app
USER freesewing
CMD ["./node_modules/.bin/pm2-runtime",  "./dist/index.mjs"]
