import { Component, OnInit } from '@angular/core';
import { IncidentWithComments } from '../shared/incident-with-comments.model';
// tslint:disable-next-line:max-line-length
import { IncidentWithPriorityAssignedToCreatedByAndComments } from '../shared/incident-with-priority-assignedto-createdby-and-comments.model';
import { IncidentService } from '../shared/incident.service';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/';
import { OpenIdConnectService } from 'src/app/shared/open-id-connect.service';

@Component({
  selector: 'incident-system-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit, OnDestroy {

  public incident: any;
  private incidentId: string;
  private sub: Subscription;
  // tslint:disable-next-line:no-inferrable-types
  private isManager: boolean =
    (this.openIdConnectService.user.profile.role === 'Manager');

  constructor(private incidentService: IncidentService,
    private route: ActivatedRoute,
    private openIdConnectService: OpenIdConnectService) {
  }

  ngOnInit() {
    // get route data (incidentId)
    this.sub = this.route.params.subscribe(
      params => {
        this.incidentId = params['incidentId'];

        if (this.isManager === true) {
        // get incident with priority and assignedto fields
        this.incidentService.getIncidentWithPriorityAssignedToCreatedByAndComments(this.incidentId)
        .subscribe(incident => {
          this.incident = incident;
        });
      } else {
        // get incident
        this.incidentService.getIncidentWithComments(this.incidentId)
        .subscribe(incident => {
          this.incident = incident;
        });
      }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
