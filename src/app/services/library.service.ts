import { Injectable, EventEmitter } from '@angular/core';
import { APIService } from './api.service';
import { LibraryFile } from '../models/library.file';

@Injectable()
export class LibraryService {
    constructor(private apiService: APIService) { }

    trackFiles: EventEmitter<Array<LibraryFile>> = new EventEmitter();

    fetchTrackFiles() {
        this.apiService.makeRequest('api/library', 'get').subscribe((data) => {
            this.trackFiles.next(data);
        });
    }
}