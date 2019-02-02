import { IncidentWithPriorityAssignedToAndCreatedBy } from './incident-with-priority-assignedto-and-createdby.model';

export class IncidentWithPriorityAssignedToCreatedByAndComments extends IncidentWithPriorityAssignedToAndCreatedBy {
    comments: Comment[];
}
