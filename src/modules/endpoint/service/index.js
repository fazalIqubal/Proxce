import { apiEndpoint } from '../../../services/endpoint';
import { EndpointsService } from './endpoints.service';
export const endpointsService = new EndpointsService(apiEndpoint);
