import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyListRoutingModule } from './study-list-routing.module';
import { StudyListComponent } from './study-list.component';


@NgModule({
  declarations: [
    StudyListComponent
  ],
  imports: [
    CommonModule,
    StudyListRoutingModule
  ]
})
export class StudyListModule { }
