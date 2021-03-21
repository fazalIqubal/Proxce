import { apiConnectionEndpoint } from '../../../services/endpoint';
import { ConnectionService } from './connection.service';
export const connectionService = new ConnectionService(apiConnectionEndpoint);
