import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Menu, MenuItem } from '../models/menu';
import { MenuService } from '../services/menu.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private menuService: MenuService, private authService: AuthService) { 
   

  }

  setupTopMenu() {
    let menu = new Menu('top');
    menu.addItem(new MenuItem('Dashboard', '/'));
    menu.addItem(new MenuItem('Logout', 'logout', 'event'));
    menu.addItem(new MenuItem('Exit', 'app-exit', 'electron'));
    this.menuService.addMenu(menu);
    this.menuService.itemEvent.subscribe((event)=>{
      if(event=='logout') {
        this.authService.logout();
      }
    });

  }

  ngOnInit() {
    this.setupTopMenu();
  }

  

}
