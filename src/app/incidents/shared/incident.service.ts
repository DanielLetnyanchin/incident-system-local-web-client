import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from './incident.model';
import { BaseService } from '../../shared/base.service';
import { IncidentWithPriorityAndAssignedTo } from './incident-with-priority-and-assignedto.model';
import { IncidentWithPriority } from './incident-with-priority.model';
import { IncidentForCreation } from './incident-for-creation.model';
import { IncidentWithPriorityAndAssignedToForCreation } from './incident-with-priority-and-assignedto-for-creation.model';
@Injectable()
export class IncidentService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>(`${this.apiUrl}/incidents`);
    }

    getIncident(incidentId: string): Observable<Incident> {
        return this.http.get<Incident>(`${this.apiUrl}/incidents/${incidentId}`,
        { headers: {'Accept': 'application/vnd.conceptual-soft.incident+json'} });
    }

    getIncidentWithPriority(incidentId: string): Observable<IncidentWithPriority> {
      return this.http.get<IncidentWithPriorityAndAssignedTo>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-soft.incidentwithpriorityandassignedto+json'} });
    }

    getIncidentWithPriorityAndAssignedTo(incidentId: string): Observable<IncidentWithPriorityAndAssignedTo> {
      return this.http.get<IncidentWithPriorityAndAssignedTo>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-soft.incidentwithpriorityandassignedto+json'} });
    }

    addIncident(incidentToAdd: IncidentForCreation): Observable<Incident> {
      return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
          { headers: { 'Content-Type': 'application/json' } });
    }

    addIncidentWithPriorityAndAssignedTo(incidentToAdd: IncidentWithPriorityAndAssignedToForCreation): Observable<Incident> {
        return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
            { headers: { 'Content-Type': 'application/vnd.conceptual-soft.incidentwithpriorityandassignedtoforcreation+json' } });
    }
}
