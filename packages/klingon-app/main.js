const electron = require('electron');
const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');
const isDev = process.env.KLINGON_ENV === 'DEV';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
  let appUrl = isDev ? 'http://localhost:4200' : `file://${__dirname}/dist-ui/index.html`;
  const PROTOCOL = 'file';
  mainWindow = new BrowserWindow({ width: 1024, height: 768, webPreferences: { webSecurity: false } });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('ready', function (e) {
  });

  /**
   * Handle "Request scheme 'file' is unsupported" error
   */
  electron.protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
    // Strip protocol

    let url = request.url.substr(PROTOCOL.length + 1);

    // Build complete path for node require function
    url = path.join('', '', url);

    // Replace backslashes by forward slashes (windows)
    url = process.platform === 'win32' ? url.replace(/\\/g, '/') : path.normalize(url);

    callback({ path: url });
  });

  mainWindow.loadURL(appUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
