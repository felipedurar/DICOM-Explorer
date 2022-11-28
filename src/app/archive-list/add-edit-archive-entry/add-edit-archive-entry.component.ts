import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import PacsArchive from 'src/app/models/pacs-archive.model';
import { ArchiveStoreService } from 'src/app/services/archive-store.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-archive-entry',
  templateUrl: './add-edit-archive-entry.component.html',
  styleUrls: ['./add-edit-archive-entry.component.css']
})
export class AddEditArchiveEntryComponent implements OnInit {

  @Input() archive: PacsArchive = {
    ID: '',
    ArchiveName: '',
    QIDO_RS_BASE_URL: '',
    STOW_RS_BASE_URL: '',
    WADO_RS_BASE_URL: '',
    WADO_URI: ''
  };

  public archiveForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private archiveStoreService: ArchiveStoreService) {
    this.archiveForm = this.formBuilder.group({
      ArchiveName: ['', Validators.required],
      QIDO_RS_BASE_URL: ['', Validators.required],
      STOW_RS_BASE_URL: ['', Validators.required],
      WADO_RS_BASE_URL: ['', Validators.required],
      WADO_URI: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.archiveForm.patchValue(this.archive);
  }

  save() {
    //console.log(this.archiveForm.value);

    Object.assign(this.archive, this.archiveForm.value);

    if (!this.archive.ID) {
      this.archive.ID = uuidv4();
      this.archiveStoreService.pacsArchives.next([...this.archiveStoreService.pacsArchives.value, this.archive]);
    } else {
      const originalArchive = this.archiveStoreService.pacsArchives.value.filter(x => x.ID == this.archive.ID)[0];
      Object.assign(originalArchive, this.archive);
      this.archiveStoreService.pacsArchives.next(this.archiveStoreService.pacsArchives.value); // Just to trigger observables
    }

    this.activeModal.close(true);
  }

}
