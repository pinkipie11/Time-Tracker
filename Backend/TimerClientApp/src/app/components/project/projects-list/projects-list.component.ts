import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  public projects?: Project[];

  constructor(http: HttpClient) {
    http.get<Project[]>(environment.apiUrl + '/projects').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
  }

  title = 'TimerClientApp';
}

interface Project {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  completedDate: Date;

}
