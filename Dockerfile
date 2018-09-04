### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:9-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /klingon && cp -R ./node_modules ./klingon

WORKDIR /klingon

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build:app:ui
