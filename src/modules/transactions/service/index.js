import { apiAuthEndpoint } from '../../../services/endpoint';
import { TransactionsService } from './transactions.service';
export const transactionsService = new TransactionsService(apiAuthEndpoint);
