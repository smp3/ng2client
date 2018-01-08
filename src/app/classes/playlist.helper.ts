import { Playlist } from "../models/playlist";

/*
TODO: add namespaces https://www.typescriptlang.org/docs/handbook/namespaces.html
*/
export function findById(id: any, playlists: Array<Playlist>): number {
    for (let i in playlists) {
        if (playlists[i].id == id) {
            return parseInt(i);
        }
    }

    return null;
}
