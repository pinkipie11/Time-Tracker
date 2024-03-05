import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number | null;
  name: string;
  description: string;
  createdDate: Date;
  completedDate: Date | null;
}

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {
  projectId: number | null = null;
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.projectId = +id;
      this.getProject();
    } else {
      this.initNewProject();
    }
  }

  initNewProject(): void {
    this.project = {
      id: null,
      name: '',
      description: '',
      createdDate: new Date(),
      completedDate: null,
    };
  }

  getProject(): void {
    this.http.get<Project>(`/api/Projects/${this.projectId}`).subscribe(project => {
      this.project = project;
    });
  }

  saveProject(): void {
    if (this.projectId) {
      this.http.put(`/api/Projects/${this.projectId}`, this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    } else {
      this.http.post('/api/Projects', this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
