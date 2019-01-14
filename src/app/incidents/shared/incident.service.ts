import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from './incident.model';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class IncidentService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>(`${this.apiUrl}/incidents`);
    }

    getIncident(incidentId: number): Observable<Incident> {
        return this.http.get<Incident>(`${this.apiUrl}/incidents/${incidentId}`);
    }
}
