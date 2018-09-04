FROM library/node:10.9.0

COPY . .

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm cache clean --force

RUN npm install -g lerna@3 @angular/cli@1.7

RUN npm install \
    && lerna bootstrap

RUN npm run build:app:ui

