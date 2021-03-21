import { apiApplicationEndpoint } from '../../../services/endpoint';
import { ApplicationService } from './application.service';
export const applicationService = new ApplicationService(apiApplicationEndpoint);
