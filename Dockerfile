FROM node:14-alpine as dist-builder
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

FROM node:14-alpine as node_modules-installer
WORKDIR /app
COPY . /app
RUN yarn install --only=production

FROM node:14-alpine as production
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist /app/dist

COPY --from=node_modules-installer /app/package.json /app/package.json
COPY --from=node_modules-installer /app/yarn.lock /app/yarn.lock
COPY --from=node_modules-installer /app/node_modules /app/node_modules