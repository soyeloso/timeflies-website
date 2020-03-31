import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/models/Project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/services/project.service';
import { TimerService } from 'src/services/timer.service';

@Component({
  selector: 'app-project-bloc',
  templateUrl: './project-bloc.component.html',
  styleUrls: ['./project-bloc.component.scss']
})
export class ProjectBlocComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  title: string;
  isRunning: boolean;
  isRunningSubscription: Subscription;

  constructor(
    public router: Router,
    private projectService: ProjectService,
    private timerService: TimerService
  ) { }

  ngOnInit(
  ) {
    this.isRunningSubscription = this.timerService.isRunning$.subscribe(value => {
      this.isRunning = value;
    });
  }

  onGoToProjectView() {
    this.projectService.project$.next(this.project);
    this.router.navigate(['/project/' + this.project.projectId]);
  }

  startTimer() {
    this.timerService.startTimer(this.project.projectId);
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  ngOnDestroy() {
    this.isRunningSubscription.unsubscribe();
  }

}
