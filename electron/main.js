const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const { createWindow, getExit, setExit } = require('./main.window');
const { initListening } = require('./events');

var win;
var exit = false;


app.on('ready', () => {
    win = createWindow(app, true);
    initListening(app, win);
});

app.on('before-quit', () => {
    setExit(true);
});

app.on('activate', function () {
    win.show();
})