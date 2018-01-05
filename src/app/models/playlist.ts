import {User} from './user';
import {PlaylistItem} from './playlist.item';

export class Playlist {
    id: any;
    title: string;
    user: User;
    items: Array<PlaylistItem>=[];
    
}