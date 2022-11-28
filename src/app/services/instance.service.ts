import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchiveStoreService } from './archive-store.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(private http: HttpClient, private archiveStoreService: ArchiveStoreService) { }

  public listInstancesPaged(studyInstanceUID: string, seriesInstanceUID: string, page: number, amount: number) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances?limit=${amount}&includefield=all&offset=${page * amount}`);
  }

  public listInstances(studyInstanceUID: string, seriesInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances?includefield=all`);
  }

  public countInstances(studyInstanceUID: string, seriesInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances/count`);
  }


}
