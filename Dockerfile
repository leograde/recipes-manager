FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn build
