FROM node:9-alpine

COPY . .

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm i -g lerna@3 && npm i -g @angular/cli@1.7
RUN npm i && lerna bootstrap
RUN npm run build:app:ui
