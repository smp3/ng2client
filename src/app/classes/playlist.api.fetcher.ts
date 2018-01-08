import { APIService } from '../services/api.service';
import { PlaylistFetcher } from "./playlist.fetcher";
import { Playlist } from "../models/playlist";

export class PlaylistAPIFetcher extends PlaylistFetcher {
    constructor(private apiService: APIService) {
        super();

    }

    fetchAll() {
        return new Promise((resolve, reject) => {
            this.apiService.makeRequest('api/playlists', 'get').subscribe((data) => {
                resolve(data);
            });
        });
    }


    private transform(playlist: Playlist) {
        let data = {
            title: playlist.title,
            id: (playlist.id ? playlist.id : null),
            items: []
        };

        for(let i of playlist.items) {
            data.items.push(i.file.id);
        }

        return {
         playlist: data
        };
    }

    save(playlist: Playlist) {
        return new Promise((resolve, reject) => {
            let url, method, data;
            
            if (playlist.id) {
                url = 'api/' + playlist.id + '/playlist'
                method = 'put';
            }

            data = this.transform(playlist);

            console.log(data);

            this.apiService.makeRequest(url, method, data,true,true, 'application/json').subscribe((data)=>{
                this.fetchAll().then((playlists)=>{
                    resolve(playlists);
                });
            });

            
        });
    }

    delete(playlist: Playlist) {

    }
    clear() {

    }
}