import { IncidentWithPriorityAndAssignedTo } from './incident-with-priority-and-assignedto.model';

export class IncidentWithPriorityAssignedToAndComments extends IncidentWithPriorityAndAssignedTo {
    comments: Comment[];
}
