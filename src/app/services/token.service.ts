import { Injectable } from '@angular/core'

const TOKEN_KEY = 'jwt_token';

@Injectable()
export class TokenService {
    private storage;

    constructor() {
        this.storage = window.localStorage;
    }

    getToken() {
        return this.storage.getItem(TOKEN_KEY);
    }

    setToken(token) {
        this.storage.setItem(TOKEN_KEY, token);
    }

    resetToken() {
        this.storage.removeItem(TOKEN_KEY);
    }
}