import { Incident } from './incident.model';

export class IncidentWithComments extends Incident {
    comments: Comment[];
}
