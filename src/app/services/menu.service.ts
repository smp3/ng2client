import { Injectable } from '@angular/core';

import {ElectronService} from './electron.service';
import { Menu } from '../models/menu';


/*
TODO: output new menu for event from here and then handle it from the component or electron
*/
@Injectable()
export class MenuService
{
    protected menus: Array<Menu>=[];
    
    constructor(private electronService: ElectronService) {

    }

    
    addMenu(menu: Menu) {
        this.menus.push(menu);
        if(this.electronService.isElectron()) {
            this.electronService.send('menu-added', menu);
        }  
        return this;
    }
}
