import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/models/Project.model';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projectsList: Project[];
  archivedList: Project[];
  projectsSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.getProjects();
    this.projectsSubscription = this.projectService.projects$.subscribe(
      (projects: Project[]) => {
        this.projectsList = [];
        this.archivedList = [];
        projects.forEach(p => {
          p.isArchived ? this.archivedList.push(p) : this.projectsList.push(p);
        });
      }
    );
  }

  getProjects() {
    this.projectService.getProjects();
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }

}
