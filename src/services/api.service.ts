import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/models/Project.model';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Timer } from 'src/models/Timer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      console.error(
        `L'API retourn ce code ${error.status}, ` +
        `le contenu était: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Oups, quelque chose ne marche pas, réssayez pus tard !.');
  }

  getProjects() {
    return this.http.get<Project[]>(`${this.url}/projects`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addProject(project: Project) {
    return this.http.post<Project>(`${this.url}/projects`, project, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  saveProject(project: Project) {
    return this.http.put<Project>(`${this.url}/projects/${project.projectId}`, project, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteProject(project: Project) {
    return this.http.delete<Project>(`${this.url}/projects/${project.projectId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProject(projectId: number) {
    return this.http.get<Project>(`${this.url}/projects/${projectId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  startTimer(projectId: number) {
    return this.http.get<Timer>(`${this.url}/timers/start/${projectId}`, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  stopTimer(timerId: number) {
    return this.http.get<Timer>(`${this.url}/timers/stop/${timerId}`, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getTimersByProjectId(projectId: number) {
    return this.http.get<Timer[]>(`${this.url}/timers/project/${projectId}`, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  saveTimer(timer: Timer) {
    return this.http.put<Timer>(`${this.url}/timers/${timer.timerId}`, timer, { headers: this.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteTimer(timer: Timer) {
    return this.http.delete<Timer>(`${this.url}/timers/${timer.timerId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


}
