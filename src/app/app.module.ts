/*
Angular
*/
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
/*
Third-party
*/
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap';
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
import { PlaybackTimePipe } from './pipes/playback.time.pipe';
import { ElectronService } from './services/electron.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MenuService } from './services/menu.service';
import { AuthService } from './services/auth.service';
import {LibraryService} from './services/library.service';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TrackTitlePipe,
    PlaybackTimePipe,
    LoginComponent,
    LibraryComponent,
    PlayerComponent,
    PlaylistComponent,
    PlaylistsComponent,
    DashboardComponent,
    TopMenuComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
  ],
  providers: [
    SettingsService,
    APIService,
    AuthService,
    PlayerService,
    PlaylistService,
    PlaylistManagerService,
    PlayerTimeService,
    ElectronService,
    MenuService,
    LibraryService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
