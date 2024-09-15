type TSystemLogs = {
  logId: string;
  errorCode: number | null;
  errorMessages: string | null;
  apiMethod: string | null;
  apiRoute: string | null;
  payload: string | null;
  timeCreated: Date | null;
};

type TFilterSystemLogs = Omit<TSystemLogs, 'logId'>;

export { TFilterSystemLogs, TSystemLogs };
