import { apiAuthEndpoint, apiOperatorEndpoint } from '../../../services/endpoint';
import { UserService } from './UserService';
export const userService = new UserService(apiAuthEndpoint);
