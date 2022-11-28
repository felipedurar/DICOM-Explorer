import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchiveStoreService } from './archive-store.service';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private http: HttpClient, private archiveStoreService: ArchiveStoreService) { }

  public listSeriesPaged(studyInstanceUID: string, page: number, amount: number) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series?limit=${amount}&includefield=all&offset=${page * amount}`)
  }

  public listSeries(studyInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series?includefield=all`)
  }

  public countSeries(studyInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series/count`)
  }

}
