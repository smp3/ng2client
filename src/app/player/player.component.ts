import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService, PlayerState } from '../services/player.service';
import { PlaylistService } from '../services/playlist.service';
import { PlayerTimeService } from '../services/player.time.service';
import { LibraryFile } from '../models/library.file';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {


  private playerStateSub = null;
  private playerFileSub = null;
  fileInfoText: string = '';
  currentFile: LibraryFile = null;
  elapsedTime = null;
  elapsedPercentage = 0;
  totalTime = null;


  constructor(
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private playerTimeService: PlayerTimeService
  ) { }


  play() {
    if (this.currentFile) {
      this.playerService.playOrResume(this.currentFile);
    }
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

  next() {
    this.playlistService.next();
  }

  previous() {
    this.playlistService.previous();
  }


  seekStart(e) {
    console.log('seekStart', e);
  }

  seekEnd(e) {
    console.log('seekEnd', e);
  }

  ngOnInit() {
    this.playerFileSub = this.playerService.fileChange.subscribe((file: LibraryFile) => {
      this.currentFile = file;

    });

    this.playerTimeService.totalChanged.subscribe((total) => {
      this.totalTime = total;
    });

    this.playerTimeService.etaChanged.subscribe((eta) => {
      this.elapsedTime = eta;
      if (this.totalTime > 0) {
        this.elapsedPercentage = (this.elapsedTime / this.totalTime) * 100;
      }

    });

    this.playerStateSub = this.playerService.stateChange.subscribe((state: PlayerState) => {

    });
  }

  ngOnDestroy() {
    this.playerStateSub.unsubscribe();
    this.playerFileSub.unsubscribe();
  }
}
