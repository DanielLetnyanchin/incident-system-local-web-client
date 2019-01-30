import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from './incident.model';
import { BaseService } from '../../shared/base.service';
import { IncidentWithPriorityAndAssignedTo } from './incident-with-priority-and-assignedto.model';
import { IncidentForCreation } from './incident-for-creation.model';
import { IncidentWithStatusPriorityAndAssignedToForCreation } from './incident-with-status-priority-and-assignedto-for-creation.model';
import { IncidentWithComments } from './incident-with-comments.model';
import { IncidentWithPriorityAssignedToAndComments } from './incident-with-priority-assignedto-and-comments.model';
@Injectable()
export class IncidentService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>(`${this.apiUrl}/incidents`);
    }

    getIncident(incidentId: string): Observable<Incident> {
        return this.http.get<Incident>(`${this.apiUrl}/incidents/${incidentId}`);
    }

    getIncidentWithComments(incidentId: string): Observable<IncidentWithComments> {
      return this.http.get<IncidentWithComments>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithcomments+json'} });
    }

    getIncidentWithPriorityAndAssignedTo(incidentId: string): Observable<IncidentWithPriorityAndAssignedTo> {
      return this.http.get<IncidentWithPriorityAndAssignedTo>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithpriorityandassignedto+json'} });
    }

    getIncidentWithPriorityAssignedToAndComments(incidentId: string): Observable<IncidentWithPriorityAssignedToAndComments> {
      return this.http.get<IncidentWithPriorityAssignedToAndComments>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithpriorityassignedtoandcomments+json'} });
    }

    addIncident(incidentToAdd: IncidentForCreation): Observable<Incident> {
      return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
          { headers: { 'Content-Type': 'application/json' } });
    }

    addIncidentWithPriorityAndAssignedTo(incidentToAdd: IncidentWithStatusPriorityAndAssignedToForCreation): Observable<Incident> {
        return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
            { headers: { 'Content-Type': 'application/vnd.conceptual-inc.incidentwithstatuspriorityandassignedtoforcreation+json' } });
    }
}
