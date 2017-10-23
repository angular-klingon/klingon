const electron = require('electron');
const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');
const isDev = process.env.KLINGON_ENV === 'DEV';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  let url = isDev ? 'http://localhost:4200' : `file://${__dirname}/dist-ui/index.html`;

  mainWindow = new BrowserWindow({ width: 1024, height: 768 });

  mainWindow.loadURL(url);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  app.quit();
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
