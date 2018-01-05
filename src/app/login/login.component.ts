import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = 'maciek';
  password: string = 'test';
  server: string = 'http://localhost:8000';

  constructor(private apiService: APIService, private settingsService: SettingsService) { }

  ngOnInit() {
  }

  login() {

    this.settingsService.set('server', this.server);
    
    let req = this.apiService.makeRequest('api/login_check', 'post', {
      '_username': this.username,
      '_password': this.password
    }, false);

    req.subscribe((data) => {
      console.log('data', data);
      this.settingsService.set('token', data.token);
    });


  }

}
