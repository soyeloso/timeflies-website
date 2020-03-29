import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Project } from 'src/models/Project.model';
import * as firebase from 'firebase';
import { ApiService } from './api.service';
import { Timer } from 'src/models/Timer.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  private projects: Project[];
  project$: BehaviorSubject<Project> = new BehaviorSubject<Project>(new Project());
  private project: Project;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  emitProjects() {
    this.projects$.next(this.projects);
  }

  emitProject() {
    this.project$.next(this.project);
  }

  addProject(project: Project) {
    this.apiService.addProject(project).subscribe((res: any) => {
      if (!this.projects) {
        this.projects = [];
      }
      this.project = res;
      this.emitProject();
      this.projects.push(res);
      this.emitProjects();
      this.router.navigate(['/project/' + res.projectId]);
    },
      (error) => {
        console.log(error);
      }
    );
  }

  saveProject(project: Project) {
    this.apiService.saveProject(project).subscribe((res: any) => {
      this.project = res;
      this.emitProject();
      this.updateProjects(res);
      this.emitProjects();
    },
      (error) => {
        console.log(error);
      }
    );
  }


  getProjects() {
    this.apiService.getProjects().subscribe((res: any) => {
      this.projects = res;
      this.emitProjects();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  getProject(projectId: number) {
    this.apiService.getProject(projectId).subscribe((res: any) => {
      this.project = res;
      this.emitProject();
    }, (error) => {
      console.log(error);
    }
    );
  }

  removeProject(project: Project) {
    this.apiService.deleteProject(project).subscribe(() => {
      this.projects = this.projects.filter(p => p.projectId !== project.projectId);
      this.emitProjects();
    }, (error) => {
      console.log(error);
    });
  }

  fetchTimers(project: Project) {
    this.apiService.getTimersByProjectId(project.projectId).subscribe((timers: Timer[]) => {
      this.project = project;
      this.project.timers = timers;
      this.emitProject();
    }, (error) => {
      console.log(error);
    });
  }

  saveTimer(timer: Timer) {
    this.apiService.saveTimer(timer).subscribe((res: any) => {
      this.updateTimers(timer, false);
      this.emitProject();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTimer(timer: Timer) {
    this.apiService.deleteTimer(timer).subscribe((res: any) => {
      this.updateTimers(timer, true);
      this.emitProject();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  private updateTimers(timer: Timer, isDeleted = false) {
    if (isDeleted) {
      this.project.timers = this.project.timers.filter(t => t.timerId !== timer.timerId);
    } else {
      const index = this.project.timers.findIndex(t => t.timerId === timer.timerId);
      this.project.timers[index] = timer;
    }
  }

  private updateProjects(project: Project) {
    const index = this.projects.findIndex(p => p.projectId === project.projectId);
    this.projects[index] = project;
  }

}
