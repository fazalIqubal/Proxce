import { apiTenantEndpoint, apiEndpoint } from '../../../services/endpoint';
import { TenantService } from './tenant.service';
export const tenantService = new TenantService(apiTenantEndpoint, apiEndpoint);