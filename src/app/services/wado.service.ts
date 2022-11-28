import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchiveStoreService } from './archive-store.service';

@Injectable({
  providedIn: 'root'
})
export class WADOService {

  constructor(private http: HttpClient, private archiveStoreService: ArchiveStoreService) { }

  genWadoFrameURL(studyInstanceUID: string, seriesInstanceUID: string, instanceObjectId: string, frameNumber: number) {
    return `${this.archiveStoreService.getWadoUri()}?requestType=WADO&studyUID=${studyInstanceUID}&seriesUID=${seriesInstanceUID}&objectUID=${instanceObjectId}&contentType=image/jpeg&frameNumber=${frameNumber}`;
  }

  requestFrame(studyInstanceUID: string, seriesInstanceUID: string, instanceObjectId: string, frameNumber: number) {
    return this.http.get(this.genWadoFrameURL(studyInstanceUID, seriesInstanceUID, instanceObjectId, frameNumber));
  }


}
