FROM node:9-alpine

# Install Python.
RUN \
  apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm i -g lerna@3 && npm i -g @angular/cli@1.7
RUN npm i && lerna bootstrap
RUN npm run build:app:ui
