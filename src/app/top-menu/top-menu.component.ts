import { Component, OnInit, OnChanges } from '@angular/core';
import { Menu, MenuItem } from '../models/menu';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  topMenu: Menu;

  constructor(public menuService: MenuService) {
    this.menuService.newMenu.subscribe((menu: Menu) => {
      this.topMenu = menu;
      
    });

  }


  ngOnInit() {
   
  }

}
