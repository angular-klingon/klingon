# use latest Node LTS (Boron)
FROM node:carbon

# install Angular CLI
RUN npm install -g @angular/cli@6 --unsafe