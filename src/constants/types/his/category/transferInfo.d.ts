export type TTransferInfo = {
  id: string | null;
  code: string | null;
  name: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TTransferInfoFields = keyof TTransferInfo;

export type TransferInfoModalType = 'add' | 'view' | 'edit';

export type TFilterTransferInfo = {
  code: string | null;
  name: string | null;
};
