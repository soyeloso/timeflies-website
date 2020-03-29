import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { Timer } from 'src/models/Timer.model';
import * as firebase from 'firebase';
import { Project } from 'src/models/Project.model';
import { ProjectService } from './project.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timers$: BehaviorSubject<Timer[]> = new BehaviorSubject<Timer[]>([]);
  private timers: Timer[];

  timer$: Subject<Timer> = new Subject<Timer>();
  private timer: Timer;

  isRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  counter$: Observable<number>;
  private counter: number;
  private counterSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private apiService: ApiService
  ) { }

  emitTimers() {
    this.timers$.next(this.timers);
  }

  emitTimer() {
    this.timer$.next(this.timer);
  }

  startTimer(projectId: number) {
    this.counter$ = interval(1000);
    this.counterSubscription = this.counter$
      .subscribe((counter: number) => {
        this.counter = counter;
      });

    this.apiService.startTimer(projectId).subscribe(
      (res: any) => {
        this.timer = res;
        this.emitTimer();
      });
    this.isRunning$.next(true);
  }

  stopTimer() {
    this.counterSubscription.unsubscribe();
    this.timer.duration = this.counter;
    this.apiService.stopTimer(this.timer.timerId).subscribe(
      (res: any) => {
        this.timer = res;
        this.emitTimer();

        // On met à jour le project concerné
        const project = this.projectService.project$.getValue();
        project.timers.push(res);
        this.projectService.project$.next(project);

      });
    this.isRunning$.next(false);
    this.counter = 0;
  }
}
