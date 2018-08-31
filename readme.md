<p align="center">
  <h1 align="center">Angular Klingon</h1>
  <h4 align="center">The perfect @angular/cli companion.</h4>
</p>
<p align="center">
  <img with="192" align="center" src="https://angular.run/img/icons/android-chrome-192x192.png"/>
</p>
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/1699357/29433535-dc8fe89e-839f-11e7-89a4-4aee1ccdfc03.png"/>
</p>

<hr>

[![CircleCI](https://circleci.com/gh/manekinekko/klingon.svg?style=svg)](https://circleci.com/gh/manekinekko/klingon)

| Klingon App | Klingon UI | Klingon Server | Klingon Website |
|--|--|--|--|
| [![Klingon App](https://img.shields.io/npm/v/@klingon/app.svg)](https://www.npmjs.com/package/@klingon/app) |  [![Klingon UI](https://img.shields.io/npm/v/@klingon/ui.svg)](https://www.npmjs.com/package/@klingon/ui) | [![Klingon Server](https://img.shields.io/npm/v/@klingon/server.svg)](https://www.npmjs.com/package/@klingon/server) | [![Klingon Website](https://img.shields.io/npm/v/@klingon/website.svg)](https://www.npmjs.com/package/@klingon/website) |


### Repo organisation

This monorepo hosts 4 projects:

1. [klingon-ui](https://github.com/manekinekko/klingon/tree/master/packages/klingon-ui): the core application: the companion app. This app is built using the @angular/cli.
2. [klingon-server](https://github.com/manekinekko/klingon/tree/master/packages/klingon-server): the server (agent) application that serves a backend for the companion application. Its role is to spin up PTY instances and allow the companion app to communicate with those PTY instances via WebSocket.
3. [klingon-app](https://github.com/manekinekko/klingon/tree/master/packages/klingon-app): the electron shell host for the companion application.
4. [klingon-website](https://github.com/manekinekko/klingon/tree/master/packages/klingon-website): the source code for [angular.run](https://angular.run).

### How to run locally (wip)

1. [Install electron](https://github.com/electron/electron) if it hasn't been done already.
2. Run the server `npm run start:server`
3. Run the ui `npm run start:ui`
4. Run the application within the electron shell `npm run start:app` or go to [http://localhost:4200](http://localhost:4200)

### How to package the application

- For OSX `npm run package:app:osx`
- For Windows `npm run package:app:win` (not tested yet)
- For Linux `npm run package:app:linux` (not tested yet)


### Contributions [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/manekinekko/klingon/issues)

You are welcome to contribute to this project. This project is still in its early stage, no feature is frozen yet. All suggestions/fixes/help are more than welcome. Add your feedback to [this todo list](https://github.com/manekinekko/klingon/issues/3) for feature requests.

Please contact me ([@manekinekko](https://twitter.com/manekinekko)) if you need some help getting started with the setup.

Want to file a bug, contribute some code, or improve documentation? Excellent !
Read up on our guidelines for [contributing](https://github.com/manekinekko/klingon/blob/master/CONTRIBUTING.md).

### Contributors

[<img alt="wassim chegham" src="https://avatars3.githubusercontent.com/u/1699357?s=60&v=4">](https://github.com/manekinekko)
[<img alt="rudy-weber" src="https://avatars0.githubusercontent.com/u/3034760?s=60&v=4">](https://github.com/rudyWeber)
[<img alt="olivier-leplus" src="https://avatars1.githubusercontent.com/u/2637742?s=60&v=4">](https://github.com/tagazok)
[<img alt="Bram Borggreve" src="https://avatars0.githubusercontent.com/u/36491?s=60&v=4">](https://github.com/beeman)
