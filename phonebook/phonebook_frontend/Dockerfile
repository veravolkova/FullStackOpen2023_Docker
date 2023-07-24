# Build stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

# Test stage
FROM build-stage as test

ENV CI=true

RUN npm run test

# Package stage
FROM test as package

COPY --from=build-stage /usr/src/app .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]
