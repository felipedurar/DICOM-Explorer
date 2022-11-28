import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IpcRenderer } from 'electron';
import PacsArchive from '../models/pacs-archive.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveStoreService {

  public pacsArchives: BehaviorSubject<PacsArchive[]> = new BehaviorSubject<PacsArchive[]>([]);
  public currentArchive: BehaviorSubject<PacsArchive | null> = new BehaviorSubject<PacsArchive | null>(null);
  private ipc: IpcRenderer | null = null;

  private localStorageKey = 'ArchiveList';

  constructor() {
    // Get the IPC renderer
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }

    // First Retrieve
    if (!!this.ipc) {
      // If running on electron, retrieve from file
      this.ipc.invoke('loadArchiveList', {}).then((archiveList: PacsArchive[]) => {
        this.pacsArchives.next(archiveList);
      });
    } else {
      // If running on browser, retrieve from local storage
      const lsArchiveListStr = localStorage.getItem(this.localStorageKey);
      if (!!lsArchiveListStr) {
        const archiveListArray = JSON.parse(lsArchiveListStr);
        this.pacsArchives.next(archiveListArray);
      }
    }

    // Subscribe to PACS Archives
    this.pacsArchives.subscribe((newList) => {
      if (!!this.ipc) {
        this.ipc.send('saveArchiveList', {
          archiveList: this.pacsArchives.value
        });
      } else {
        const lsArchiveListStr = JSON.stringify(this.pacsArchives.value);
        localStorage.setItem(this.localStorageKey, lsArchiveListStr);
      }
    });


  }

  public getQidoRs() {
    return this.currentArchive.value?.QIDO_RS_BASE_URL;
  }

  public getWadoRs() {
    return this.currentArchive.value?.WADO_RS_BASE_URL;
  }

  public getStowRs() {
    return this.currentArchive.value?.STOW_RS_BASE_URL;
  }

  public getWadoUri() {
    return this.currentArchive.value?.WADO_URI;
  }

}
