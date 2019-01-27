import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { Manager } from './manager.model';
import { tap } from 'rxjs/operators';
import { Priority } from './priority.model';
import { Status } from './status.model';

// Master data that's used across the application
@Injectable()
export class MasterDataService extends BaseService {

  private priorities: Priority[];
  private statuses: Status[];
  private managers: Manager[];

  constructor(private http: HttpClient) {
    super();
  }

  getPriorities(): Observable<Priority[]> {
    if (this.priorities) {
      return of(this.priorities);
    } else {
      return this.http.get<Priority[]>(`${this.apiUrl}/priorities`)
      .pipe(
        tap((prioritiesFromResponse) => {
          this.priorities = prioritiesFromResponse;
        })
      );
    }
  }

  getStatuses(): Observable<Status[]> {
    if (this.statuses) {
      return of(this.statuses);
    } else {
      return this.http.get<Status[]>(`${this.apiUrl}/statuses`)
      .pipe(
        tap((statusesFromResponse) => {
          this.statuses = statusesFromResponse;
        })
      );
    }
  }

  getManagers(): Observable<Manager[]> {
    if (this.managers) {
      return of(this.managers);
    } else {
      return this.http.get<Manager[]>(`${this.apiUrl}/managers`)
      .pipe(
        tap((managersFromResponse) => {
          this.managers = managersFromResponse;
        })
      );
    }
  }

}
