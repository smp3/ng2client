import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'playback_time'
})
export class PlaybackTimePipe implements PipeTransform {
    protected formatChunk(chunk) {
        chunk = Math.floor(chunk);

        if(chunk<10) {
            chunk = '0'+chunk;
        }

        return chunk;
    }

    transform(time): string {
        let minutes = this.formatChunk(time / 60);
        let seconds = this.formatChunk(time % 60);
        return minutes + ':' + seconds;
    }
}