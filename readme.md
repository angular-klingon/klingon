<p align="center">
  <h1 align="center">Angular Klingon</h1>
  <h4 align="center">The perfect @angular/cli companion.</h4>
</p>

<p align="center" >

  <img src="https://img.shields.io/github/license/manekinekko/klingon.svg"/>
  
  <a href="https://app.buddy.works/manekinekko-1/klingon/pipelines/pipeline/150032">
    <img src="https://app.buddy.works/manekinekko-1/klingon/pipelines/pipeline/150032/badge.svg?token=cee6a291d42aeeb701176104f8623d429614bf77cb0c7d7b68bc5a342e49ffe9"/>
  </a>
    
  <a href="https://github.com/manekinekko/klingon/compare/master...develop">
    <img src="https://img.shields.io/github/commits-since/manekinekko/klingon/master.svg?label=commits%20to%20deploy"/>
  </a>
  
 <a href="https://github.com/manekinekko/klingon">
    <img src="https://img.shields.io/github/contributors/manekinekko/klingon.svg"/>
  </a>
  
 <a href="https://angular.run">
    <img src="https://img.shields.io/website-up-down-ff69b4-ff69b4/http/shields.io.svg?label=angular.run"/>
  </a>

  <a href="https://twitter.com/manekinekko">
    <img src="https://img.shields.io/badge/say-thanks-ff69b4.svg"/>
  </a>
  
  <a href="https://angular.io">
    <img src="https://img.shields.io/badge/Made%20with-Angular-E13137.svg"/>
  </a>
  
</p>
<p align="center">
  <img with="192" align="center" src="https://angular.run/img/icons/android-chrome-192x192.png"/>
</p>
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/1699357/29433535-dc8fe89e-839f-11e7-89a4-4aee1ccdfc03.png"/>
</p>

<hr>

| Package | Version | Description |
|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [klingon-app](https://github.com/manekinekko/klingon/tree/master/packages/klingon-app) | [![Klingon App](https://img.shields.io/npm/v/@klingon/app.svg)](https://www.npmjs.com/package/@klingon/app) | the electron shell host for the companion application. |
| [klingon-ui](https://github.com/manekinekko/klingon/tree/master/packages/klingon-ui) | [![Klingon UI](https://img.shields.io/npm/v/@klingon/ui.svg)](https://www.npmjs.com/package/@klingon/ui) | the core application: the companion app. This app is built using the @angular/cli. |
| [klingon-server](https://github.com/manekinekko/klingon/tree/master/packages/klingon-server) | [![Klingon Server](https://img.shields.io/npm/v/@klingon/server.svg)](https://www.npmjs.com/package/@klingon/server) | the server (agent) application that serves a backend for the companion application. Its role is to spin up PTY instances and allow the companion app to communicate with those PTY instances via WebSocket. |
| [klingon-website](https://github.com/manekinekko/klingon/tree/master/packages/klingon-website) | [![Klingon Website](https://img.shields.io/npm/v/@klingon/website.svg)](https://www.npmjs.com/package/@klingon/website) | the source code for [angular.run](https://angular.run). |

### How to run locally (wip)

1. Clone repo and install dependencies.
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
