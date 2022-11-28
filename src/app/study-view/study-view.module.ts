import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyViewRoutingModule } from './study-view-routing.module';
import { StudyViewComponent } from './study-view.component';


@NgModule({
  declarations: [
    StudyViewComponent
  ],
  imports: [
    CommonModule,
    StudyViewRoutingModule
  ]
})
export class StudyViewModule { }
