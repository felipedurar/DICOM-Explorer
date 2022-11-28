import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyListComponent } from './study-list.component';

const routes: Routes = [{ path: '', component: StudyListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyListRoutingModule { }
