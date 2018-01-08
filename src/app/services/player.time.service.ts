import { Injectable, EventEmitter } from '@angular/core';
import { PlayerService, PlayerState } from './player.service';


@Injectable()
export class PlayerTimeService {

    private _elapsedTime = null;
    private _totalTime = null;
    private interval = null;

    etaChanged: EventEmitter<any> = new EventEmitter();
    totalChanged: EventEmitter<any> = new EventEmitter();

    constructor(private playerService: PlayerService) {

        this.playerService.fileLoad.subscribe((data) => {
            this.totalTime = data.duration;
            this.elapsedTime=0;
            
        });

        this.playerService.stateChange.subscribe((state: PlayerState)=>{
            if(state==PlayerState.STOPPED || state==PlayerState.TRACKEND) {
                this.elapsedTime = 0;
                this.clearInterval();
            }

            if(state==PlayerState.PAUSED) {
                this.clearInterval();
            }

            if(state==PlayerState.PLAYING) {
                this.startTicking();
            }

        
        });
    }


    clearInterval() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    startTicking() {
        this.clearInterval();
        
        this.interval = setInterval(()=>{
            this.elapsedTime = this.elapsedTime + 1;
        }, 1000);
    }

    set elapsedTime(elapsedTime) {
        this._elapsedTime=elapsedTime;
        this.etaChanged.next(this._elapsedTime);
    }

    get elapsedTime() {
        return this._elapsedTime;
    }

    set totalTime(totalTime) {
        this._totalTime = totalTime;
        this.totalChanged.next(this._totalTime);
    }

    get totalTime() {
        return this._totalTime;
    }
}