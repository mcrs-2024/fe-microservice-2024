export type TReceivingSource = {
  id: string | null;
  recievingSourceCode: string | null;
  recievingSourceName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TReceivingSourceFields = keyof TReceivingSource;

export type ReceivingSourceModalType = 'add' | 'view' | 'edit';

export type TFilterReceivingSource = {
  recievingSourceCode: string | null;
  recievingSourceName: string | null;
};
