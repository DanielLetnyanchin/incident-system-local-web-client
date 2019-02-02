import { IncidentAbstractBase } from './incident-abstract-base.model';

export class IncidentGeneralInfo extends IncidentAbstractBase {
  incidentId: string;
  status: string;
  dateModified: Date;
  dateCreated: Date;
}
