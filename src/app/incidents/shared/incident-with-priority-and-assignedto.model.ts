import { IncidentWithPriority } from './incident-with-priority.model';

export class IncidentWithPriorityAndAssignedTo extends IncidentWithPriority {
  assignedTo: string;
}
