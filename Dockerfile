FROM node:20-alpine AS build
WORKDIR /source

COPY yarn.lock .
COPY package.json .

RUN npm i --no-audit --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:1.27.3-alpine

RUN apk add bash

COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /source/dist /usr/share/nginx/html