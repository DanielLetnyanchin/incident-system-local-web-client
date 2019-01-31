import { Component, OnInit } from '@angular/core';
import { Incident } from '../shared/incident.model';
import { IncidentWithComments } from '../shared/incident-with-comments.model';
import { IncidentWithPriorityAndAssignedTo } from '../shared/incident-with-priority-and-assignedto.model';
import { IncidentService } from '../shared/incident.service';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'incident-system-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit, OnDestroy {

  private incident: any;
  private incidentId: string;
  private sub: Subscription;
  // tslint:disable-next-line:no-inferrable-types
  private isAdmin: boolean = false;

  constructor(private incidentService: IncidentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // get route data (incidentId)
    this.sub = this.route.params.subscribe(
      params => {
        this.incidentId = params['incidentId'];

        if (this.isAdmin === true) {
        // get incident with priority and assignedto fields
        this.incidentService.getIncidentWithPriorityAssignedToAndComments(this.incidentId)
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
