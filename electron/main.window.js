const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const { setupTray } = require('./tray');


var exit;

function getExit()
{
    return exit;
}

function setExit(sExit) {
    exit = sExit;
}

function createWindow(app, devTools) {


    let iconPath = __dirname + '/../src/favicon.png';

    let win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#aaa',
        icon: iconPath,
        title: "SMP3 Player",
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }
    })
    win.loadURL(`file://${__dirname}/../dist/index.html`)

    if (devTools) {
        win.webContents.openDevTools();
    }

    win.setMenu(null);


    win.on('close', function (e) {
        if (exit) {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }

    });

    setupTray(app, win, iconPath);


    return win;
}

module.exports = {
    createWindow: createWindow,
    getExit: getExit,
    setExit: setExit,
};