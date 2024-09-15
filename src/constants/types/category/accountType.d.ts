export type TAccountType = {
  customerTypeCode: string;
  customerTypeRefName: string;
} & TAuditInfo;
export type TAccountFields = keyof TAccount;
export type AccountModalType = 'add' | 'edit' | 'view';

export type TFilterAccount = {
  customerTypeCode: string;
  customerTypeRefName: string;
};
