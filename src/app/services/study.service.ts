import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchiveStoreService } from './archive-store.service';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: HttpClient, private archiveStoreService: ArchiveStoreService) { }

  public listStudies(page: number, amount: number) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies?limit=${amount}&includefield=all&offset=${page * amount}`)
  }

  public getStudy(studyInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies?StudyInstanceUID=${studyInstanceUID}`)
  }

  public countStudies(studyInstanceUID: string) {
    return this.http.get(`${this.archiveStoreService.getQidoRs()}/studies/count`)
  }

}
