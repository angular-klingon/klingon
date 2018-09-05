# use latest Node LTS (Boron)
FROM node:carbon

# install Angular CLI
RUN npm install -g @angular/cli@6 --unsafe

# install Angular CLI
RUN npm install -g lerna@3 --unsafe

# install Firebase CLI
RUN npm install -g firebase-tools