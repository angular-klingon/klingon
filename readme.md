[![CircleCI](https://circleci.com/gh/manekinekko/klingon.svg?style=svg)](https://circleci.com/gh/manekinekko/klingon)
# Klingon

WIP

![image](https://user-images.githubusercontent.com/1699357/28571542-a16493e6-7143-11e7-9962-5e512e0a18fd.png)

### Repo organisation

This monorepo hosts 4 projects:

1. [klingon-app](https://github.com/manekinekko/klingon/tree/master/packages/klingon-app): the core application: the companion app. This app is built using the @angular/cli.
2. [klingon-server](https://github.com/manekinekko/klingon/tree/master/packages/klingon-server): the server (agent) application that serves a backend for the companion application. Its role is to spin up up PTY instances and allow the companion app to commnicate with those PTY instances via WebSocket.
3. [klingon-electron](https://github.com/manekinekko/klingon/tree/master/packages/klingon-electron): the electron shell host for the companion application.
4. [klingon-website](https://github.com/manekinekko/klingon/tree/master/packages/klingon-website): the source code for [angular.run](https://angular.run).

### How to run locally (wip)

1. Run the server `npm run start:server`
2. Run the application `npm run start:app`

