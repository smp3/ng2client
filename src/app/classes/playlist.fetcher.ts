import {Playlist} from "../models/playlist";
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export abstract class PlaylistFetcher {
    //fetchedPlaylists
    
    abstract fetchAll();
    abstract save(playlist: Playlist);
    abstract delete(playlist: Playlist);
    abstract clear();

    
}