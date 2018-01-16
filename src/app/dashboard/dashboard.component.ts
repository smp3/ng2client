import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    
  }

  logout() {
    console.log('logout');
    this.settingsService.set('token',null);
  }

}
