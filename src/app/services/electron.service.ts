import { Injectable } from '@angular/core';

declare const ipcRenderer: any;
declare const isElectron: any;
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
}