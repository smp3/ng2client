import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlaylistService } from '../services/playlist.service';
import { SettingsService } from '../services/settings.service';
import { APIService } from '../services/api.service';
import { LibraryFile } from '../models/library.file';


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
    private playlistService: PlaylistService
  ) {

  }

  ngOnInit() {
    this.apiService.makeRequest('api/library', 'get').subscribe((data) => {
      // console.log('adta', data);
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
