import {Playlist} from "../models/playlist";


export abstract class PlaylistFetcher {
    //fetchedPlaylists
    
    abstract fetchAll();
    abstract save(playlist: Playlist);
    abstract delete(playlist: Playlist);
    abstract clear();

    
}