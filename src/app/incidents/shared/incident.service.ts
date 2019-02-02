import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incident } from './incident.model';
import { BaseService } from '../../shared/base.service';
import { IncidentWithPriorityAssignedToAndCreatedBy } from './incident-with-priority-assignedto-and-createdby.model';
import { IncidentForCreation } from './incident-for-creation.model';
import { IncidentWithStatusPriorityAndAssignedToForCreation } from './incident-with-status-priority-and-assignedto-for-creation.model';
import { IncidentWithComments } from './incident-with-comments.model';
import { IncidentWithPriorityAssignedToCreatedByAndComments } from './incident-with-priority-assignedto-createdby-and-comments.model';
import { Operation } from 'fast-json-patch';
import { IncidentGeneralInfo } from './incident-general-info.model';
// tslint:disable-next-line:max-line-length
import { IncidentGeneralInfoWithPriorityAssignedToAndCreatedBy } from './incident-general-info-with-priority-assignedto-and-createdby.model';

@Injectable()
export class IncidentService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getIncidentsGeneralInfo(): Observable<IncidentGeneralInfo[]> {
      return this.http.get<IncidentGeneralInfo[]>(`${this.apiUrl}/incidents`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentgeneralinfo+json'} });
    }

    getIncidentsGeneralInfoWithPriorityAssignedToAndCreatedBy(): Observable<IncidentGeneralInfoWithPriorityAssignedToAndCreatedBy[]> {
      return this.http.get<IncidentGeneralInfoWithPriorityAssignedToAndCreatedBy[]>(`${this.apiUrl}/incidents`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentgeneralinfowithpriorityassignedtoandcreatedby+json'} });
    }

    getIncident(incidentId: string): Observable<Incident> {
        return this.http.get<Incident>(`${this.apiUrl}/incidents/${incidentId}`,
        { headers: {'Accept': 'application/vnd.conceptual-inc.incident+json'} });
    }

    getIncidentWithComments(incidentId: string): Observable<IncidentWithComments> {
      return this.http.get<IncidentWithComments>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithcomments+json'} });
    }

    getIncidentWithPriorityAssignedToAndCreatedBy(incidentId: string): Observable<IncidentWithPriorityAssignedToAndCreatedBy> {
      return this.http.get<IncidentWithPriorityAssignedToAndCreatedBy>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithpriorityassignedtoandcreatedby+json'} });
    }

    // tslint:disable-next-line:max-line-length
    getIncidentWithPriorityAssignedToCreatedByAndComments(incidentId: string): Observable<IncidentWithPriorityAssignedToCreatedByAndComments> {
      return this.http.get<IncidentWithPriorityAssignedToCreatedByAndComments>(`${this.apiUrl}/incidents/${incidentId}`,
      { headers: {'Accept': 'application/vnd.conceptual-inc.incidentwithpriorityassignedtocreatedbyandcomments+json'} });
    }

    addIncident(incidentToAdd: IncidentForCreation): Observable<Incident> {
      return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
          { headers: { 'Content-Type': 'application/vnd.conceptual-inc.incidentforcreation+json' } });
    }

    addIncidentWithStatusPriorityAndAssignedTo(incidentToAdd: IncidentWithStatusPriorityAndAssignedToForCreation): Observable<Incident> {
        return this.http.post<Incident>(`${this.apiUrl}/incidents`, incidentToAdd,
            { headers: { 'Content-Type': 'application/vnd.conceptual-inc.incidentwithstatuspriorityandassignedtoforcreation+json' } });
    }

    partiallyUpdateIncident(incidentId: string, patchDocument: Operation[]): Observable<any> {
      return this.http.patch(`${this.apiUrl}/incidents/${incidentId}`, patchDocument,
      { headers: { 'Content-Type': 'application/vnd.conceptual-inc.incident-json-patch-document+json' } });
    }
}
