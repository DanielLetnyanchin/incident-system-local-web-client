import { IncidentGeneralInfo } from './incident-general-info.model';

export class IncidentGeneralInfoWithPriorityAssignedToAndCreatedBy extends IncidentGeneralInfo {
  priority: string;
  assignedTo: string;
  createdBy: string;
}
