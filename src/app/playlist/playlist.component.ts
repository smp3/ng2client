import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  private playlist: Playlist;

  constructor(private playlistService: PlaylistService) {

    
  }

  ngOnInit() {
    this.playlistService.playlistChanged.subscribe((playlist: Playlist) => {
      console.log(playlist);
      this.playlist = playlist;
    });
  }

  play() {
    this.playlistService.playEnqueued();
  }

  delete(index) {
    this.playlistService.delete(index);
  }

}
