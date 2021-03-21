import { apiEndpoint } from '../../../services/endpoint';
import { UsersService } from './users.service';
export const usersService = new UsersService(apiEndpoint);
