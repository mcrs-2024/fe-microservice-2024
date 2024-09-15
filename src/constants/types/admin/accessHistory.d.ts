type TAccessHistory = {
  id: string;
  userId: string;
  loginTime: Date;
  signoutTime: Date | null;
  updateTime: Date | null;
  ipAddress: string;
};
type TAccessHistoryField = keyof TAccessHistory;
type TFilterAccessHistory = Omit<TAccessHistory, 'id'>;

export { TAccessHistory, TAccessHistoryField, TFilterAccessHistory };
