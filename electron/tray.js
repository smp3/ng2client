const { Tray, Menu } = require('electron');

function setupTray(app, window, iconPath) {
    let appIcon = new Tray(iconPath)

    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: function () {
                window.show()
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
                window.webContents.send('player-stop');
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

module.exports = {setupTray: setupTray}