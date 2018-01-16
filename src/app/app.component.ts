import { Component } from '@angular/core';
import {ElectronService} from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isElectron: boolean = false;

  constructor(protected electronService: ElectronService) {
    this.isElectron = this.electronService.isElectron();
  }



}
