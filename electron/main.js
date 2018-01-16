const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');

var win;
var exit = false;

function createWindow() {


    let iconPath = __dirname + '/../src/favicon.png';
    console.log('ppath',    path.join(__dirname, 'preload.js'));
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#aaa',
        icon: __dirname + '/../src/favicon.png',
        title: "SMP3 Player",
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }
    })
    win.loadURL(`file://${__dirname}/../dist/index.html`)

    // win.webContents.openDevTools();
    //win.setMenu(null);


    win.on('close', function (e) {
        if (exit) {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }

    });

    ipcMain.on('menu-added',(e, data)=>{
        console.log('menu added', data);
    });

    let appIcon = new Tray(iconPath)

    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: function () {
                win.show()
            }
        },
        {
            label: 'Play',
            click: (e) => {
                console.log('TODO');
            }
        },
        {
            label: 'Stop',
            click: (e) => {
                win.webContents.send('player-stop');
            }
        },
        {
            label: 'Pause',
            click: (e) => {
                console.log('TODO');
            }
        },
        {
            label: 'Next',
            click: (e) => {
                console.log('TODO');
            }
        },
        {
            label: 'Previous',
            click: (e) => {
                console.log('TODO');
            }
        },
        {
            label: 'Quit',
            click: function () {
                exit = true;
                app.quit();
            }
        }
    ])

    appIcon.setContextMenu(contextMenu)
}



app.on('ready', createWindow)

app.on('before-quit', () => exit = true);

app.on('activate', function () {
    win.show();
})