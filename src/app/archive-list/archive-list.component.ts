import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PacsArchive from '../models/pacs-archive.model';
import { ArchiveStoreService } from '../services/archive-store.service';
import { ArchiveChooseModalComponent } from './archive-choose-modal/archive-choose-modal.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {

  public archiveList: PacsArchive[] = [];

  constructor(private modalService: NgbModal, private archiveStore: ArchiveStoreService) { }

  ngOnInit(): void {
    // Load Archives
    // this.archiveList.push({
    //   ID: uuidv4(),
    //   ArchiveName: 'DCM4CHEE Local',
    //   QIDO_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
    //   STOW_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
    //   WADO_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs'
    // });
    // this.archiveList.push({
    //   ID: uuidv4(),
    //   ArchiveName: 'Orthanc Research',
    //   QIDO_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
    //   STOW_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
    //   WADO_RS_BASE_URL: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs'
    // });
    // this.archiveStore.pacsArchives.next(this.archiveList);
    // if (this.archiveStore.pacsArchives.value.length == 0) {

    // }

    const modalRef = this.modalService.open(ArchiveChooseModalComponent, { centered: true,  backdrop: 'static' });
		//modalRef.componentInstance.archiveList = this.archiveList;
  }

}
