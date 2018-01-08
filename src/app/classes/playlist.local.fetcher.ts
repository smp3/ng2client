import {md5} from 'md5';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Playlist } from "../models/playlist";
import { PlaylistFetcher } from "./playlist.fetcher";
import {findById} from "./playlist.helper";

const STORAGE_KEY = 'playlists';

export class PlaylistLocalFetcher extends PlaylistFetcher {
    private storage;
    private playlists: Array<Playlist> = [];

    constructor() {
        super();
        this.storage = window.localStorage;
        this.load();

    }

    persist() {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.playlists));
    }

    clear() {
        this.playlists = [];
        this.persist();
    }

    load() {

        try {
            this.playlists = JSON.parse(this.storage.getItem(STORAGE_KEY));
        } catch (SyntaxError) {
            this.clear();
        }

        if (this.playlists == null) {
            this.clear();
        } else {
            for(let i in this.playlists) {
                this.playlists[i].isLocal=true;
            }
        }

    }

    fetchAll() {

        return new Promise((resolve, reject) => {
            this.load();
            resolve(this.playlists);
        });

    }

    delete(playlist: Playlist) {

        return new Promise((resolve, reject) => {
            this.load();

            let pl = findById(playlist.id, this.playlists);

            this.playlists.splice(pl, 1);
            this.persist();
            resolve(this.playlists);
        });


    }

    private makeId(playlist: Playlist) {
        let timestamp = new Date().getTime();
        return timestamp;
        
    }

    save(playlist: Playlist) {

        return new Promise((resolve, reject) => {
            playlist.isLocal = true;
            
            this.load();

            if(!playlist.id) {
                playlist.id = this.makeId(playlist);
            }
            
            let pi = findById(playlist.id, this.playlists);

            if (pi == null) {
                this.playlists.push(playlist);
            } else {
                this.playlists[pi] = playlist;
            }


            this.persist();

            resolve(this.playlists);

        });

    }
}
