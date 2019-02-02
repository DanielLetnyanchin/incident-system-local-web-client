import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IncidentService } from './shared/incident.service';
// tslint:disable-next-line:max-line-length
import { IncidentGeneralInfoWithPriorityAssignedToAndCreatedBy } from './shared/incident-general-info-with-priority-assignedto-and-createdby.model';
import { IncidentGeneralInfo } from './shared/incident-general-info.model';

@Component({
  selector: 'incident-system-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  title: string = 'Incident overview';
  incidents: any[] = [];

  // tslint:disable-next-line:no-inferrable-types
  private isAdmin: boolean = true;

  constructor(private incidentService: IncidentService) {
      }

      ngOnInit() {
        if (this.isAdmin === true) {
          this.incidentService.getIncidentsGeneralInfoWithPriorityAssignedToAndCreatedBy()
          .subscribe(incidents => {
              this.incidents = incidents;
          });
        } else {
          this.incidentService.getIncidentsGeneralInfo()
          .subscribe(incidents => {
              this.incidents = incidents;
          });
        }
      }

}
