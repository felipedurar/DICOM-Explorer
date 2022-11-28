import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveListRoutingModule } from './archive-list-routing.module';
import { ArchiveListComponent } from './archive-list.component';
import { ArchiveChooseModalComponent } from './archive-choose-modal/archive-choose-modal.component';
import { AddEditArchiveEntryComponent } from './add-edit-archive-entry/add-edit-archive-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArchiveListComponent,
    ArchiveChooseModalComponent,
    AddEditArchiveEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArchiveListRoutingModule
  ]
})
export class ArchiveListModule { }
