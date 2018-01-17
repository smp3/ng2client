import { Component, OnInit } from '@angular/core';
import {ElectronService} from './services/electron.service';
import { Menu, MenuItem } from './models/menu';
import { MenuService } from './services/menu.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isElectron: boolean = false;

  constructor(protected electronService: ElectronService, private menuService: MenuService, private authService: AuthService) {
    this.isElectron = this.electronService.isElectron();
  }

  setupTopMenu() {
    let menu = new Menu('top');
    menu.addItem(new MenuItem('Dashboard', '/'));
    menu.addItem(new MenuItem('Settings', '/settings'));
    menu.addItem(new MenuItem('Logout', 'logout', 'event'));
    if(this.isElectron) {
     menu.addItem(new MenuItem('Exit', 'app-exit', 'electron'));
    }
    this.menuService.addMenu(menu);
    this.menuService.itemEvent.subscribe((event)=>{
      if(event=='logout') {
        this.authService.logout();
      }
    });

  }
  
  ngOnInit() {
    
    if(this.authService.loggedIn) {
      this.setupTopMenu();
    } 
    
    this.authService.loggedInEvent.subscribe(()=>{
      this.setupTopMenu();
    });

    this.authService.loggedOutEvent.subscribe(()=>{
      this.menuService.deleteMenu('top');
    });
  }
}
