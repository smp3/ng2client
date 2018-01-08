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

  private playlists: any = [];

  constructor(protected playlistManagerService: PlaylistManagerService) { }

  ngOnInit() {
    this.playlistManagerService.fetchAll('local');
    this.playlistManagerService.playlists$.subscribe((playlists) => {
      console.log('ps', playlists);
      this.playlists = playlists;
    });
  }

  selectPlaylist(playlist: Playlist) {
    this.playlistManagerService.select(playlist);
  }

  deletePlaylist(i: number) {
    this.playlistManagerService.delete('local', i);
  }

  clearPlaylists() {
    this.playlistManagerService.clear('local');
  }

  newPlaylist() {
    this.playlistManagerService.create('Playlist');
  }

}
