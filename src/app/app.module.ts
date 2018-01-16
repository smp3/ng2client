/*
Angular
*/
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
/*
Third-party
*/
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
/*
App
*/
import { SettingsService } from './services/settings.service';
import { APIService } from './services/api.service';
import { PlayerService } from './services/player.service';
import { PlayerTimeService } from './services/player.time.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistService } from './services/playlist.service';
import { PlaylistManagerService } from './services/playlist.manager.service';
import { TrackTitlePipe } from './pipes/track.title.pipe';
import { PlaylistsComponent } from './playlists/playlists.component';
import {PlaybackTimePipe} from './pipes/playback.time.pipe';
import {ElectronService} from './services/electron.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackTitlePipe,
    PlaybackTimePipe,
    LoginComponent,
    LibraryComponent,
    PlayerComponent,
    PlaylistComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ProgressbarModule.forRoot(),
  ],
  providers: [
    SettingsService,
    APIService,
    PlayerService,
    PlaylistService,
    PlaylistManagerService,
    PlayerTimeService,
    ElectronService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
