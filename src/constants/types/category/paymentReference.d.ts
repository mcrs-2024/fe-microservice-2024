type TPaymentReference = {
  arPaymentSubTypeCode: string | null; // mã thanh toán
  arPaymentSubTypeRefName: string; // tên
  arPaymentTypeCode: string; // loại
  description: string;
  currencyRcd: string;
} & TAuditInfo;
export type TPaymentReferenceFields = keyof TPaymentReference;
export type PaymentReferenceModalType = 'add' | 'edit' | 'view';

export type TFilterPaymentReference = {
  arPaymentSubTypeCode: string;
  arPaymentSubTypeRefName: string;
};
