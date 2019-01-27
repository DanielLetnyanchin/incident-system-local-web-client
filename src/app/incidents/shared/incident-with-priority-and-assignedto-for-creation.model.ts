import { IncidentForCreation } from './incident-for-creation.model';


export class IncidentWithPriorityAndAssignedToForCreation extends IncidentForCreation {
    // createdBy: string;
    priority: string;
    assignedToProfileId: string;
}
