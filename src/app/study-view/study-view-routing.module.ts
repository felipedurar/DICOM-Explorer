import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyViewComponent } from './study-view.component';

const routes: Routes = [{ path: '', component: StudyViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyViewRoutingModule { }
