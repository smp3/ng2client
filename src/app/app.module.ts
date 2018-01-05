import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';
import { APIService } from './services/api.service';
import { PlayerService } from './services/player.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistService } from './services/playlist.service';
import {PlaylistManagerService} from './services/playlist.manager.service';
import {TrackTitlePipe} from './pipes/track.title.pipe';
import { PlaylistsComponent } from './playlists/playlists.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackTitlePipe,
    LoginComponent,
    LibraryComponent,
    PlayerComponent,
    PlaylistComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SettingsService,
    APIService,
    PlayerService,
    PlaylistService,
    PlaylistManagerService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
