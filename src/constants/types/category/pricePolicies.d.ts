type TPricePolice = {
  id: string | null;
  policyPriceTypeGroupCode: string;
  policyPriceTypeGroupRefName: string;
} & TAuditInfo;
export type TPricePoliceFields = keyof TPricePolice;
export type ChapterPricePoliceModalType = 'add' | 'edit' | 'view';

export type TFilterPricePolice = {
  policyPriceTypeGroupCode: string;
  policyPriceTypeGroupRefName: string;
};
