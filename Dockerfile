FROM gcr.io/angular-cloud-builder/ng

COPY package.json package-lock.json ./
COPY packages/klingon-ui/package.json packages/klingon-ui/package-lock.json ./packages/klingon-ui

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && \
    mkdir /klingon && \
    cp -R ./node_modules ./klingon && \
    cp -R ./packages/klingon-ui/node_modules ./klingon/packages/klingon-ui/

WORKDIR /klingon

COPY . .

RUN npm run build:app:ui