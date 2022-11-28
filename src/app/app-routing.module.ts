import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'archive-list', loadChildren: () => import('./archive-list/archive-list.module').then(m => m.ArchiveListModule) },
  { path: '', pathMatch: 'full', redirectTo: 'archive-list' },
  { path: 'study-list', loadChildren: () => import('./study-list/study-list.module').then(m => m.StudyListModule) },
  { path: 'study-view', loadChildren: () => import('./study-view/study-view.module').then(m => m.StudyViewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
