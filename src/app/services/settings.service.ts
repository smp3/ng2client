import { Injectable } from '@angular/core'

const SETTINGS_KEY = 'smp3_settings';

@Injectable()
export class SettingsService {
    private storage;

    constructor() {
        this.storage = window.localStorage;
        let settings = this.getAll();
        if (!settings) {
            this.setAll({});
        }

    }

    public set(key, value) {
        let settings = this.getAll();

        settings[key] = value;

        this.setAll(settings);

        return this;
    }

    public get(key, def = null) {
        let settings = this.getAll();

        if (settings[key]) {
            return settings[key];
        }

        return def;
    }

    public setAll(data) {
        this.storage.setItem(SETTINGS_KEY, JSON.stringify(data));
    }

    public getAll() {
        let data;

        try {
            data = JSON.parse(this.storage.getItem(SETTINGS_KEY));
        } catch (SyntaxError) {
            data = {};
        }

        return data;
    }
}