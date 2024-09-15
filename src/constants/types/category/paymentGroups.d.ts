type TPaymentGroups = {
  arPaymentTypeGroupCode: string | null;
  arPaymentTypeGroupRefName: string | null;
  description: string | null;
  requiresSubTypeFlag: boolean | null;
} & TAuditInfo;

export type TPaymentGroupsFields = keyof TPaymentGroups;

export type PaymentGroupsModalType = 'add' | 'edit' | 'view';

export type TFilterPaymentGroups = {
  arPaymentTypeGroupCode: string | null;
  arPaymentTypeGroupRefName: string | null;
};
