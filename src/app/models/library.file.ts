import {Track} from './track';
import {Artist} from './artist';
import {Album} from './album';

export interface LibraryFile {
    id: any;
    file_name: string;
    title: string;
    track: Track;
    artist: Artist;
    album: Album;
}