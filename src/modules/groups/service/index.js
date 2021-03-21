import { apiEndpoint } from '../../../services/endpoint';
import { GroupsService } from './groups.service';
export const groupsService = new GroupsService(apiEndpoint);
