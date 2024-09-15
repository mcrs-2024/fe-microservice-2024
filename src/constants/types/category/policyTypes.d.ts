type TPolicyType = {
  policyTypeId: string | null;
  policyTypeCode: string;
  policyTypeRefName: string;
} & TAuditInfo;
export type TPolicyTypeFields = keyof TPolicyType;
export type PolicyTypeModalType = 'add' | 'edit' | 'view';

export type TFilterPolicyType = {
  policyTypeCode: string;
  policyTypeRefName: string;
};
