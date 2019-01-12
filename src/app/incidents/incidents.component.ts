import { Component, OnInit, ErrorHandler } from '@angular/core';

import { Incident } from './shared/incident.model';
import { IncidentService } from './shared/incident.service';

@Component({
  selector: 'incident-system-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  title: string = 'Incident overview';
  incidents: Incident[] = [];

  constructor(private incidentService: IncidentService) {
      }

      ngOnInit() {
        this.incidentService.getIncidents()
        .subscribe(incidents => {
            this.incidents = incidents;
        });
      }

}
