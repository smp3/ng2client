import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import {PlaylistManagerService} from '../services/playlist.manager.service';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  public playlist: Playlist;

  constructor(private playlistService: PlaylistService, private playlistManagerService: PlaylistManagerService) {

    
  }

  ngOnInit() {
    this.playlistService.playlistChanged.subscribe((playlist: Playlist) => {
      this.playlist = playlist;
    });
  }

  play() {
    this.playlistService.playEnqueued();
  }

  delete(index) {
    this.playlistService.delete(index);
  }
  
  savePlaylist(fetcher) {
    this.playlistManagerService.save(fetcher, this.playlist);
  }

}
