import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { APIService } from '../services/api.service';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class AuthService {

    _loggedIn: boolean = false;

    loggedInEvent: EventEmitter<any> = new EventEmitter();
    loggedOutEvent: EventEmitter<any> = new EventEmitter();



    constructor(private apiService: APIService, private settingsService: SettingsService,
        private router: Router
    ) {
        if (this.settingsService.get('token')) {
            this._loggedIn = true;
        }

        this.loggedInEvent.subscribe((data) => {
            this._loggedIn = true;
        });

        this.loggedOutEvent.subscribe((data) => {
            this._loggedIn = false;
        })
    }

    public get loggedIn(): User {
        return this._loggedIn;
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
        this.settingsService.set('token', null);
        this.router.navigate(['/login']);
        this.loggedOutEvent.next('');
    }
}