import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LibraryFile } from '../models/library.file';
import { Playlist } from '../models/playlist';
import { PlaylistItem } from '../models/playlist.item';
import { PlayerService, PlayerState } from '../services/player.service';


/*
TODO:
Playlist store service. Store classes: API or Local storage.
*/

@Injectable()
export class PlaylistService {
    private _currentPlaylist;
    private _currentPlTrack = 0;

    playlistChanged: EventEmitter<Playlist> = new EventEmitter();

    constructor(private playerService: PlayerService) {
        this.currentPlaylist = new Playlist();
        this.playerService.stateChange.subscribe((state: PlayerState) => {
            if (state == PlayerState.TRACKEND) {
                if (this._currentPlTrack < this._currentPlaylist.items.length - 1) {
                    this._currentPlTrack++;
                    this.playEnqueued();
                }
            }
        });
    }

    set currentPlaylist(playlist: Playlist) {
        this._currentPlaylist = playlist;
        this.playlistChanged.next(this._currentPlaylist);
    }

    get currentPlaylist(): Playlist {
        return this._currentPlaylist;
    }

    delete(index: number) {
        
        this._currentPlaylist.items.splice(index, 1);
        this.playlistChanged.next(this._currentPlaylist);

        if(index==this._currentPlTrack && this.playerService.state==PlayerState.PLAYING) {
            this.playerService.stop();
            this.playEnqueued();    
        }
    }

    enqueue(file: LibraryFile) {
        let pi = new PlaylistItem;
        pi.file = file;
        this._currentPlaylist.items.push(pi);
        this.playlistChanged.next(this._currentPlaylist);

    }

    playEnqueued() {
        
        if(this.currentPlaylist.items.length==0) {
            return;
        }

        this.playerService.play(this.currentPlaylist.items[this._currentPlTrack].file);
    }

    next() {
        if (this._currentPlTrack == this._currentPlaylist.items.length - 1) {
            return;
        }

        this._currentPlTrack++;
        this.playerService.stop();
        this.playEnqueued();
    }

    previous() {
        if (this._currentPlTrack == 0) {
            return;
        }

        this._currentPlTrack--;
        this.playerService.stop();
        this.playEnqueued();
    }

}