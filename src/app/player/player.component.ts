import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService, PlayerState } from '../services/player.service';
import { PlaylistService } from '../services/playlist.service';
import { LibraryFile } from '../models/library.file';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {


  private playerStateSub = null;
  private playerFileSub = null;
  private fileInfoText: string = '';
  private currentFile: LibraryFile = null;

  constructor(private playerService: PlayerService, private playlistService: PlaylistService) { }


  play() {
    if(this.currentFile) {
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

  ngOnInit() {
    this.playerFileSub = this.playerService.fileChange.subscribe((file: LibraryFile)=> {
      this.currentFile = file;
    }); 


    this.playerStateSub = this.playerService.stateChange.subscribe((state: PlayerState) => {
      
    });
  }

  ngOnDestroy() {
    this.playerStateSub.unsubscribe();
    this.playerFileSub.unsubscribe();
  }
}
