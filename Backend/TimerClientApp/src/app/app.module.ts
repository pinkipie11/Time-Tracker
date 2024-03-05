
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ProjectDeleteComponent } from './components/project/project-delete/project-delete.component';
import { TimeentriesListComponent } from './components/timeentry/timeentries-list/timeentries-list.component';
import { TimeentryEditComponent } from './components/timeentry/timeentry-edit/timeentry-edit.component';
import { TimeentryDeleteComponent } from './components/timeentry/timeentry-delete/timeentry-delete.component';
import { TagsListComponent } from './components/tag/tags-list/tags-list.component';
import { TagEditComponent } from './components/tag/tag-edit/tag-edit.component';
import { TagDeleteComponent } from './components/tag/tag-delete/tag-delete.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    ProjectEditComponent,
    ProjectDeleteComponent,
    TimeentriesListComponent,
    TimeentryEditComponent,
    TimeentryDeleteComponent,
    TagsListComponent,
    TagEditComponent,
    TagDeleteComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
