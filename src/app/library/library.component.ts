import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlaylistService } from '../services/playlist.service';
import { SettingsService } from '../services/settings.service';
import { APIService } from '../services/api.service';
import { LibraryFile } from '../models/library.file';
import {LibraryService} from '../services/library.service';


@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  trackFiles: Array<LibraryFile>;

  constructor(
    private apiService: APIService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private libraryService: LibraryService
  ) {

  }

  ngOnInit() {

    this.libraryService.fetchTrackFiles();

    this.libraryService.trackFiles.subscribe(data=>{
      this.trackFiles = data;
    });
  }

  play(file) {
    this.playerService.play(file);
  }

  enqueue(file) {
    this.playlistService.enqueue(file);
  }

}
