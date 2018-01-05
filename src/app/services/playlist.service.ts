import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LibraryFile } from '../models/library.file';
import { Playlist } from '../models/playlist';
import { PlaylistItem } from '../models/playlist.item';
import { PlayerService, PlayerState } from '../services/player.service';


@Injectable()
export class PlaylistService {
    private _currentPlaylist: Playlist;
    private _currentPlTrack = 0;

    playlistChanged: EventEmitter<Playlist> = new EventEmitter();
    trackChange: EventEmitter<number> = new EventEmitter();

    constructor(private playerService: PlayerService) {
        //this.createDefault();
        this.playerService.stateChange.subscribe((state: PlayerState) => {
            if (state == PlayerState.TRACKEND) {
                if (this._currentPlTrack < this._currentPlaylist.items.length - 1) {
                    this._currentPlTrack++;
                    this.playEnqueued();
                }
            }
        });
    }


    createDefault() {
        this.currentPlaylist = new Playlist();
        this.currentPlaylist.title = 'Default playlist';
    }

    set currentPlTrack(index: number) {
        this._currentPlTrack = index;
        this.trackChange.next(index);
    }

    get currentPlTrack() : number {
        return this._currentPlTrack;
    }

    set currentPlaylist(playlist: Playlist) {
        
        this._currentPlaylist = playlist;
        this.playlistChanged.next(this._currentPlaylist);
        this.currentPlTrack=0;
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
        if (this.currentPlTrack == this._currentPlaylist.items.length - 1) {
            return;
        }

        this.currentPlTrack++;
        this.playerService.stop();
        this.playEnqueued();
    }

    previous() {
        if (this.currentPlTrack == 0) {
            return;
        }

        this.currentPlTrack--;
        this.playerService.stop();
        this.playEnqueued();
    }

}