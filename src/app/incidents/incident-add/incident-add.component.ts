import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/';
import { IncidentService } from '../shared/incident.service';
import { Router } from '@angular/router';
import { Manager } from 'src/app/shared/manager.model';
import { MasterDataService } from 'src/app/shared/master-data.service';
import { Priority } from 'src/app/shared/priority.model';

@Component({
  selector: 'incident-system-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.css']
})
export class IncidentAddComponent implements OnInit {

  public incidentForm: FormGroup;
  priorities: Priority[];
  managers: Manager[];
  // tslint:disable-next-line:no-inferrable-types
  private isAdmin: boolean = false;

  constructor(private masterDataService: MasterDataService,
    private incidentService: IncidentService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    // define the incidentForm (with empty default values)
    this.incidentForm = this.formBuilder.group({
      title: [''],
      description: [''],
      priority: [''],
      assignedTo: ['']
    });

    if (this.isAdmin === true) {
     // get priorities from master data service
     this.masterDataService.getPriorities()
     .subscribe(priorities => {
       this.priorities = priorities;
     });
    }

    if (this.isAdmin === true) {
      // get managers from master data service
      this.masterDataService.getManagers()
        .subscribe(managers => {
          this.managers = managers;
        });
    }
  }

  addIncident(): void {
    if (this.incidentForm.dirty) {
      if (this.isAdmin === true) {
        //  create IncidentWithPriorityAndAssignedToForCreation from form model
        // tslint:disable-next-line:prefer-const
        let incident = automapper.map(
          'IncidentFormModel',
           'IncidentWithPriorityAndAssignedToForCreation',
           this.incidentForm.value);

        this.incidentService.addIncidentWithPriorityAndAssignedTo(incident)
        .subscribe(
          () => {
            this.router.navigateByUrl('/incidents');
          });
        } else {
        //  create IncidentForCreation from form model
        // tslint:disable-next-line:prefer-const
        let incident = automapper.map(
          'IncidentFormModel',
           'IncidentForCreation',
           this.incidentForm.value);

        this.incidentService.addIncident(incident)
        .subscribe(
          () => {
            this.router.navigateByUrl('/incidents');
          });
         }

    }
  }
}
