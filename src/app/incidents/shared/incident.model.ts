import { IncidentAbstractBase } from './incident-abstract-base.model';

export class Incident extends IncidentAbstractBase {
    incidentId: string;
    status: string;
    createdBy: string;
    dateModified: Date;
    dateCreated: Date;
}
