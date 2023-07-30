const downloadUsersReport = (search: string): string => {
  return `${process.env.REACT_APP_URL_BASE}/reports/users?name=${search}`;
};

export const ReportsService = {
  downloadUsersReport,
};
