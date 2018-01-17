import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { SettingsService } from '../services/settings.service';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = 'maciek';
  password: string = 'test';
  server: string = 'http://localhost:8000';

  constructor(private authService: AuthService, private settingsService: SettingsService) { }

  ngOnInit() {
  }

  login() {

    this.settingsService.set('server', this.server);
    this.authService.login(this.username, this.password);

  }

}
