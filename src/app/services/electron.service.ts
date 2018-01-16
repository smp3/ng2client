import { Injectable } from '@angular/core';

declare const ipcRenderer: any;
declare const global: any;

@Injectable()
export class ElectronService {
    isElectron() {
        if(global.isElectron) {
            return true;
        }
        
        return false;
    }
    
    on(eventName, callback) {
        if(!this.isElectron()) {
            return;
        }
        return ipcRenderer.on(eventName, callback);
    }

    send(eventName, data=null) {
        if(!this.isElectron) {
            return;
        }

        return ipcRenderer.send(eventName, data);
    }
}