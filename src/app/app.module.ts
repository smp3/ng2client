import { BrowserModule } from '@angular/platform-browser';
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
import {TrackTitlePipe} from './pipes/track.title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TrackTitlePipe,
    LoginComponent,
    LibraryComponent,
    PlayerComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    APIService,
    PlayerService,
    PlaylistService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
