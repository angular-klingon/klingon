// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/**
 * Handle following error:-
 * Fetch API cannot load <url>. URL scheme "file" is not supported.
 * */
const electron = require('electron');
electron.webFrame.registerURLSchemeAsPrivileged('file');

