import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Playlist } from "../models/playlist";
import { PlaylistService } from './playlist.service';
import { PlaylistLocalFetcher } from '../classes/playlist.local.fetcher';
import { PlaylistFetcher } from '../classes/playlist.fetcher';

@Injectable()
export class PlaylistManagerService {

    //private localFetcher;

    private fetchers = {};
    private _playlists: Subject<Array<Playlist>> = new Subject<Array<Playlist>>();;
    private playlists: Array<Playlist>;

    playlists$ = this._playlists.asObservable();



    constructor(private playlistService: PlaylistService) {
        // this.localFetcher = new PlaylistLocalFetcher();
        this.setDefault();
        this.addFetcher(new PlaylistLocalFetcher(), "local");

        this.playlists$.subscribe((playlists) => {
            this.playlists = playlists;
        });
    }


    private setDefault() {
        if (!this.playlistService.currentPlaylist) {
            this.playlistService.currentPlaylist = new Playlist();
            this.playlistService.currentPlaylist.title = 'Default playlist';
            this.playlistService.currentPlaylist.id = -1;
            

        }
    }

    private addFetcher(fetcher: PlaylistFetcher, name: string) {
        this.fetchers[name] = fetcher;

        return this;
    }

    fetchAll(name) {
        this.fetchers[name].fetchAll().then((playlists) => {
            this._playlists.next(playlists);
        });
    }

    save(name, playlist) {
        console.log('saving', playlist);
        this.fetchers[name].save(playlist).then((playlists) => {
            this._playlists.next(playlists);
        });
    }

    select(playlist: Playlist) {
        this.playlistService.currentPlaylist = playlist;
    }


    private getOtherPlaylist(playlist: Playlist) {
        if (this.playlistService.currentPlaylist.id == playlist.id) {

        }
    }

    delete(name, playlist: Playlist) {
        this.fetchers[name].delete(playlist).then((playlists) => {
            this._playlists.next(playlists);
        });
    }

    clear(name) {
        this.fetchers[name].clear();
    }

    getFetcher(name: string): PlaylistFetcher {
        return this.fetchers[name];
    }
}