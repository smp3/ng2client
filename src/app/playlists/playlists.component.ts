import { Component, ViewChild, OnInit } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { PlaylistManagerService } from '../services/playlist.manager.service';
import { Playlist } from '../models/playlist';


@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  @ViewChild(PlaylistComponent) playlistComponent: PlaylistComponent;

  playlists: any = [];
  mode = 'local';

  constructor(protected playlistManagerService: PlaylistManagerService) { }

  ngOnInit() {
    this.playlistManagerService.fetchAll(this.mode);
    this.playlistManagerService.playlists$.subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

  selectPlaylist(playlist: Playlist) {
    this.playlistManagerService.select(playlist);
  }

  deletePlaylist(i: number) {
    this.playlistManagerService.delete(this.mode, i);
  }

  clearPlaylists() {
    this.playlistManagerService.clear(this.mode);
  }

  newPlaylist() {
    this.playlistManagerService.create('Playlist');
  }

  switchMode() {
    if (this.mode == 'local') {
      this.mode = 'api';
    } else {
      this.mode = 'local';
    }

    this.playlistManagerService.fetchAll(this.mode);
  }

}
