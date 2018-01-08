import { Playlist } from "../models/playlist";


export function findById(id: any, playlists: Array<Playlist>): number {
    for (let i in playlists) {
        if (playlists[i].id == id) {
            return parseInt(i);
        }
    }

    return null;
}
