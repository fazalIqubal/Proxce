import { apiAuthEndpoint } from '../../../services/endpoint';
import { ReportService } from './report.service';
export const reportService = new ReportService(apiAuthEndpoint);
