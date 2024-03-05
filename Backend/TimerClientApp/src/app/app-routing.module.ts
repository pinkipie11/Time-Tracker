import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { TimeentriesListComponent } from './components/timeentry/timeentries-list/timeentries-list.component';


const appRoutes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'edit-project/:id', component: ProjectEditComponent },
  { path: 'add-project', component: ProjectEditComponent },
  { path: 'time-entries', component: TimeentriesListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all route
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash : true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
