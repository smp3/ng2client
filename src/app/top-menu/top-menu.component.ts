import { Component, OnInit } from '@angular/core';
import {Menu} from '../models/menu';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.addMenu(new Menu('test'));
  }

}
