import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentService } from '../shared/incident.service';
import { Incident } from '../shared/incident.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'incident-system-incident-update',
  templateUrl: './incident-update.component.html',
  styleUrls: ['./incident-update.component.css']
})
export class IncidentUpdateComponent implements OnInit, OnDestroy {

  public incidentForm: FormGroup;
  private incident: Incident;
  private incidentId: string;
  private sub: Subscription;

  constructor(private incidentService: IncidentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // define the incidentForm (with empty default values)
    this.incidentForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });

    // get route data (incidentId)
    this.sub = this.route.params.subscribe(
      params => {
        this.incidentId = params['incidentId'];

        // load incident
        this.incidentService.getIncident(this.incidentId)
          .subscribe(incident => {
            this.incident = incident;
            this.updateIncidentForm();
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateIncidentForm(): void {
    this.incidentForm.patchValue({
      title: this.incident.title,
      description: this.incident.description
    });
  }

  saveIncident(): void {
    if (this.incidentForm.dirty) {
      // TODO
    }
}
}
