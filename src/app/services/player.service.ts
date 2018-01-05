import { Howl } from 'howler';
import { Injectable, EventEmitter } from '@angular/core';
import { SettingsService } from './settings.service';
import { LibraryFile } from '../models/library.file';
import { Playlist } from '../models/playlist';
import { PlaylistItem } from '../models/playlist.item';
import { LibraryComponent } from '../library/library.component';

export enum PlayerState {
    PLAYING,
    STOPPED,
    PAUSED,
    TRACKEND,
}


@Injectable()
export class PlayerService {
    private baseUrl;
    private sound;
    private _file: LibraryFile;
    private _state: PlayerState;


    stateChange: EventEmitter<PlayerState> = new EventEmitter();
    fileChange: EventEmitter<LibraryFile> = new EventEmitter();

    constructor(private settingsService: SettingsService) {
        this.baseUrl = settingsService.get('server') + '/api/';
        this.state = PlayerState.STOPPED;
       
    }


    set file(file: LibraryFile) {
        this._file = file;
        this.fileChange.next(this._file);
    }

    get file(): LibraryFile {
        return this._file;
    }

    set state(state: PlayerState) {
        this._state = state;
        this.stateChange.next(this._state);
       
    }

    get state(): PlayerState {
        return this._state;
    }

    stop() {
        this.sound.stop();
        this.state = PlayerState.STOPPED;
    }

    pause() {
        this.sound.pause();
        this.state = PlayerState.PAUSED;
    }


    resume() {
        this.state = PlayerState.PLAYING;
        this.sound.play();
    }

    playOrResume(file: LibraryFile) {
        if (this.state == PlayerState.PLAYING) {
            return;
        }

        if (this.state == PlayerState.PAUSED || this.state == PlayerState.STOPPED) {
            this.resume();
        } else {
            this.play(file);
        }
    }

    play(file: LibraryFile) {

        this.file = file;

        let src = this.settingsService.get('server') + '/api/stream/' + file.id + '?token=' + this.settingsService.get('token');

        if (this.sound) {
            this.sound.unload();
        }

        this.state = PlayerState.PLAYING;

        this.sound = new Howl({
            src: [src],
            html5: true

        });

        this.sound.play();

        this.sound.on('end', () => {
            this.state = PlayerState.TRACKEND;
        });
    }


}