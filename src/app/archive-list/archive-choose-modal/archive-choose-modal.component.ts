import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PacsArchive from 'src/app/models/pacs-archive.model';
import { ArchiveStoreService } from 'src/app/services/archive-store.service';
import { AddEditArchiveEntryComponent } from '../add-edit-archive-entry/add-edit-archive-entry.component';

@Component({
  selector: 'app-archive-choose-modal',
  templateUrl: './archive-choose-modal.component.html',
  styleUrls: ['./archive-choose-modal.component.css']
})
export class ArchiveChooseModalComponent implements OnInit {

  //@Input() archiveList: PacsArchive[] = [];
  public archiveList: PacsArchive[] = [];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private archiveStoreService: ArchiveStoreService, private router: Router) { }

  ngOnInit(): void {
    this.archiveStoreService.pacsArchives.subscribe((archives: PacsArchive[]) => {
      this.archiveList = archives;
    });
  }

  addArchive() {
    this.modalService.open(AddEditArchiveEntryComponent, { centered: true, modalDialogClass: 'lg-modal-dialog', backdrop: 'static' });
  }

  deleteArchive(cArchive: PacsArchive, index: number, event: any) {
    event.stopPropagation();
    
    this.archiveList.splice(index, 1);
    this.archiveStoreService.pacsArchives.next(this.archiveList);
  }

  editArchive(cArchive: PacsArchive, index: number, event: any) {
    event.stopPropagation();
    
    const modalRef = this.modalService.open(AddEditArchiveEntryComponent, { centered: true, modalDialogClass: 'lg-modal-dialog', backdrop: 'static' });
    const archiveClone = Object.assign({}, cArchive);
    modalRef.componentInstance.archive = archiveClone;
  }

  openArchive(cArchive: PacsArchive) {
    console.log(cArchive);

    this.archiveStoreService.currentArchive.next(cArchive);

    this.router.navigate(['/study-list'], { queryParams: { archiveId: cArchive.ID } });

    this.activeModal.close();
  }

}
