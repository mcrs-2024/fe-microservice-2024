type TPaymentType = {
  id: string | null;
  arPaymentTypeCode: string | null;
  arPaymentTypeGroupCode: string | null;
  arPaymentTypeRefName: string | null;
  description: string | null;
  seqNum: number | null;
  currency: string | null;
} & TAuditInfo;

export type TPaymentTypeFields = keyof TPaymentType;

export type PaymentTypeModalType = 'add' | 'edit' | 'view';

export type TFilterPaymentType = {
  arPaymentTypeCode: string | null;
  arPaymentTypeGroupCode: string | null;
  arPaymentTypeRefName: string | null;
};
