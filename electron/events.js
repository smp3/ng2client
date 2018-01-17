const { ipcMain, Menu } = require('electron');
const { setupMenu } = require('./menu');
const {setExit} = require('./main.window');

function initListening(app, window) {
    ipcMain.on('menu-added', (e, data) => {
        if (data.name == 'top') {
            let menu = setupMenu(window, data);
            Menu.setApplicationMenu(menu);
        }
    });

    ipcMain.on('app-exit', (e)=>{
        setExit(true);
        app.quit();
    });
}

module.exports = {
    initListening: initListening
};