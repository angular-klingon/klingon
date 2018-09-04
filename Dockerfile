FROM node:9-alpine

COPY . .

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm cache clean --force
    
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install -g lerna@3 @angular/cli@1.7 \
    && npm install \
    && lerna bootstrap \
    && apk del .gyp

RUN npm run build:app:ui
