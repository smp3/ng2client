import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Playlist } from "../models/playlist";
import { PlaylistService } from './playlist.service';
import { PlaylistLocalFetcher } from '../classes/playlist.local.fetcher';
import { PlaylistFetcher } from '../classes/playlist.fetcher';
import {findById} from '../classes/playlist.helper';

@Injectable()
export class PlaylistManagerService {

    private fetchers = {};
    private _playlistsSubject: Subject<Array<Playlist>> = new Subject<Array<Playlist>>();
    private _playlists: Array<Playlist> = [];

    playlists$ = this._playlistsSubject.asObservable();

    constructor(private playlistService: PlaylistService) {
        this.addFetcher(new PlaylistLocalFetcher(), "local");

    }

    set playlists(playlists) {
        this._playlists = playlists;
        this._playlistsSubject.next(this.playlists);
    }

    get playlists(): Array<Playlist> {
        return this._playlists;
    }

    private addFetcher(fetcher: PlaylistFetcher, name: string) {
        this.fetchers[name] = fetcher;

        return this;
    }

    fetchAll(name) {
        this.fetchers[name].fetchAll().then((playlists) => {
            this.playlists = playlists;
        });
    }


    updateAll(playlists: Array<Playlist>, skipI = null) {


        let ps = Object.assign([], this.playlists);

        for (let pA in this.playlists) {

            for (let pB in playlists) {
                if (ps[pA].id == playlists[pB].id) {
                    ps[pA] = playlists[pB];
                }
            }
        }

        if(skipI!==null) {
            
            ps.splice(skipI, 1);
        }
        

        this.playlists = ps;
    }

    add(playlist: Playlist) {
        let ps = this.playlists;
        ps.push(playlist);

        this.updateAll(ps);
    }

    create(title, id = null): Playlist {
        let p = new Playlist();
        p.title = title;
        if (id) {
            p.id = id;
        }

        p.saved = false;
        this.add(p);

        return p;
    }

    save(name, playlist) {
        playlist.saved = true;
        this.fetchers[name].save(playlist).then((playlists) => {

            this.updateAll(playlists);
        });
    }

    select(playlist: Playlist) {
        this.playlistService.currentPlaylist = playlist;
    }


    private getOtherPlaylist(playlist: Playlist) {
        if (this.playlistService.currentPlaylist.id == playlist.id) {

        }
    }

    delete(name, playlistI) {

        let playlist = this.playlists[playlistI];

        if (playlist.id) {
            this.fetchers[name].delete(playlist).then((playlists) => {
                this.updateAll(playlists, playlistI);
            });
        }
    }

    clear(name) {
        this.fetchers[name].clear();
    }

    getFetcher(name: string): PlaylistFetcher {
        return this.fetchers[name];
    }
}