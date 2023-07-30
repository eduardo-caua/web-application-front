import { Environment } from '../../../environment';

const downloadUsersReport = (): string => {
  return `${Environment.URL_BASE}/reports/users`;
};

export const ReportsService = {
  downloadUsersReport,
};
