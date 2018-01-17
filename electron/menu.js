const { Menu, ipcMain, ipcRenderer } = require('electron');


function setupMenu(window, menuData) {

    let menuTemplate = [];

    for (let item of menuData.items) {
        let tItem = {
            label: item.title,

        };


        tItem['click'] = () => {
            if (item.actionType == 'url') {
                window.webContents.send('menu-navigate', {
                    menu: menuData.name,
                    url: item.action
                });
            } else if (item.actionType == 'event' || item.actionType=='electron') {
                window.webContents.send('menu-item-action', item);
            } 
        };

       

        menuTemplate.push(tItem);
    }


    let menu = Menu.buildFromTemplate(menuTemplate);

    return menu;
}

module.exports = {
    setupMenu: setupMenu
}