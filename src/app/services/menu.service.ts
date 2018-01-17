import { Injectable, EventEmitter } from '@angular/core';

import {ElectronService} from './electron.service';
import { Menu, MenuItem } from '../models/menu';
import { Router } from '@angular/router';


/*
TODO: output new menu for event from here and then handle it from the component or electron
*/
@Injectable()
export class MenuService
{
    protected menus={};

    newMenu: EventEmitter<Menu> = new EventEmitter();
    itemClicked: EventEmitter<MenuItem>=new EventEmitter();
    itemEvent: EventEmitter<any>=new EventEmitter();

    constructor(private electronService: ElectronService, private router: Router) {
        this.itemClicked.subscribe((item: MenuItem) => {
            if(item.actionType=='url') {
                this.router.navigate([item.action]);
            } else if(item.actionType=='event') {
                this.itemEvent.next(item.action);
            } else if (item.actionType=='electron') {
                this.electronService.send(item.action);
            }
        });

        this.electronService.on('menu-item-action', (e, item)=>{
            this.itemClicked.next(item);
        });
    }

    
    addMenu(menu: Menu) {
        
      this.menus[menu.name]=menu;

        if(this.electronService.isElectron()) {
            this.electronService.send('menu-added', menu);
        } else {
            this.newMenu.next(menu);
        }
        return this;
    }

    itemClick(item: MenuItem) {
        this.itemClicked.next(item);
    }
}
