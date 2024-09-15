type TPricePolicyType = {
  id: string | null;
  policyPriceTypeCode: string | null;
  policyPriceTypeGroupId: string | null;
  policyPriceTypeRefName: string | null;
  visitTypeGroupId: string | null;
} & TAuditInfo;

export type TPricePolicyTypeFields = keyof TPricePolicyType;

export type PricePolicyTypeModalType = 'add' | 'edit' | 'view';

export type TFilterPricePolicyType = {
  policyPriceTypeCode: string | null;
  policyPriceTypeGroupId: string | null;
  policyPriceTypeRefName: string | null;
};
