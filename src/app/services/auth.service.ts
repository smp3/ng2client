import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class AuthService {
    loggedInEvent: EventEmitter<any>=new EventEmitter();
    loggedOutEvent: EventEmitter<any>=new EventEmitter();
    
    constructor(private apiService: APIService, private settingsService: SettingsService,
        private router: Router
    ) {

    }

    login(username, password) {
        let req = this.apiService.makeRequest('api/login_check', 'post', {
            '_username': username,
            '_password': password
        }, false);

        req.subscribe((data) => {
            this.settingsService.set('token', data.token);
            this.router.navigate(['/']);
            this.loggedInEvent.next('');
          });
    }

    logout() {
        this.settingsService.set('token',null);
        this.router.navigate(['/login']);
        this.loggedOutEvent.next('');
    }
}