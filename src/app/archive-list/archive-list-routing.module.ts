import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveListComponent } from './archive-list.component';

const routes: Routes = [{ path: '', component: ArchiveListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveListRoutingModule { }
