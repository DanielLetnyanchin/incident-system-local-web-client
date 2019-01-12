import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/';
import { IncidentService } from '../shared/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'incident-system-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.css']
})
export class IncidentAddComponent implements OnInit {

  public incidentForm: FormGroup;

  constructor(private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    // define the incidentForm (with empty default values)
    this.incidentForm = this.formBuilder.group({
      status: [''],
      description: ['']
    });
  }

  addIncident(): void {
    if (this.incidentForm.dirty) {
        // TODO
    }
  }

}
