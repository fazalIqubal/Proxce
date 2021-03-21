import { apiEndpoint } from '../../../services/endpoint';
import { ActivityLogService } from './activityLog.service';
export const activityLogService = new ActivityLogService(apiEndpoint);
