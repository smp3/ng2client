const {ipcRenderer} =require('electron');

global.ipcRenderer = ipcRenderer;
global.isElectron = true;

