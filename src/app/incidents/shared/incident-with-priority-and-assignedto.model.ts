import { Incident } from './incident.model';

export class IncidentWithPriorityAndAssignedTo extends Incident {
    priority: string;
    assignedTo: string;
}
