import { Pipe, PipeTransform } from '@angular/core';
import { LibraryFile } from '../models/library.file';

@Pipe({
  name: 'track_title'
})
export class TrackTitlePipe implements PipeTransform {
  transform(file: LibraryFile): string {

    if (!file) {
      return '';
    }

    let title = file.title;

    if (file.artist && file.artist.name) {
      title = file.artist.name + ' - ' + title;
    }

    return title;
  }
}