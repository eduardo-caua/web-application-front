const downloadUsersReport = (): string => {
  return `${process.env.REACT_APP_URL_BASE}/reports/users`;
};

export const ReportsService = {
  downloadUsersReport,
};
