FROM node:9-alpine

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i -g lerna@3 && npm i -g @angular/cli@1.7 && npm i && lerna bootstrap
RUN mkdir /klingon && cp -R ./node_modules ./klingon

WORKDIR /klingon

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build:app:ui
