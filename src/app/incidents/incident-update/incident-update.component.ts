import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentService } from '../shared/incident.service';
import { Incident } from '../shared/incident.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IncidentForUpdate } from '../shared/incident-for-update.model';
import { compare } from 'fast-json-patch';
import { Status } from 'src/app/shared/status.model';
import { Priority } from 'src/app/shared/priority.model';
import { Manager } from 'src/app/shared/manager.model';
import { MasterDataService } from 'src/app/shared/master-data.service';
import { IncidentWithPriorityAssignedToAndCreatedBy } from '../shared/incident-with-priority-assignedto-and-createdby.model';

@Component({
  selector: 'incident-system-incident-update',
  templateUrl: './incident-update.component.html',
  styleUrls: ['./incident-update.component.css']
})
export class IncidentUpdateComponent implements OnInit, OnDestroy {

  public incidentForm: FormGroup;
  statuses: Status[];
  priorities: Priority[];
  managers: Manager[];
  private incident: IncidentWithPriorityAssignedToAndCreatedBy;
  private incidentId: string;
  private sub: Subscription;
  private originalIncidentForUpdate: IncidentForUpdate;
  // tslint:disable-next-line:no-inferrable-types
  private isAdmin: boolean = true;

  constructor(private masterDataService: MasterDataService,
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // define the incidentForm (with empty default values)
    this.incidentForm = this.formBuilder.group({
      title: [''],
      description: [''],
      status: [''],
      priority: [''],
      assignedTo: ['']
    });
    if (this.isAdmin === true) {
      // get route data (incidentId)
      this.sub = this.route.params.subscribe(
        params => {
          this.incidentId = params['incidentId'];

          // load incident
          this.incidentService.getIncidentWithPriorityAssignedToAndCreatedBy(this.incidentId)
            .subscribe(incident => {
              this.incident = incident;
              this.updateIncidentForm();

              this.originalIncidentForUpdate = automapper.map(
                'IncidentFormModel',
                'IncidentForUpdate',
                this.incidentForm.value);
            });
          }
        );

        // get statuses from master data service
        this.masterDataService.getStatuses()
        .subscribe(statuses => {
          this.statuses = statuses;
        });

         // get priorities from master data service
         this.masterDataService.getPriorities()
         .subscribe(priorities => {
           this.priorities = priorities;
         });

        // get managers from master data service
        this.masterDataService.getManagers()
          .subscribe(managers => {
            this.managers = managers;
          });

      }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateIncidentForm(): void {
    this.incidentForm.patchValue({
      title: this.incident.title,
      description: this.incident.description,
      status: this.incident.status,
      priority: this.incident.priority,
      assignedTo: this.incident.assignedTo
    });
  }

  saveIncident(): void {
    if (this.incidentForm.dirty) {
      // TODO

      // tslint:disable-next-line:prefer-const
      let changedIncidentForUpdate = automapper.map(
        'IncidentFormModel',
        'IncidentForUpdate',
        this.incidentForm.value);

      // tslint:disable-next-line:prefer-const
      let patchDocument = compare(this.originalIncidentForUpdate, changedIncidentForUpdate);

      this.incidentService.partiallyUpdateIncident(this.incidentId, patchDocument)
        .subscribe(
          () => {
            this.router.navigateByUrl('/incidents/' + this.incidentId);
          });
    }
}
}
