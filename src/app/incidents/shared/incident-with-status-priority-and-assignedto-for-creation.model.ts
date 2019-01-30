import { IncidentForCreation } from './incident-for-creation.model';


export class IncidentWithStatusPriorityAndAssignedToForCreation extends IncidentForCreation {
    // createdBy: string;
    status: string;
    priority: string;
    assignedToProfileId: string;
}
