type TRevenueGroups = {
  id: string | null;
  itemGroupRevenueCode: string | null;
  itemGroupRevenueRefName: string | null;
  seqNum: number | null;
} & TAuditInfo;
export type TRevenueGroupsFields = keyof TRevenueGroups;
export type RevenueGroupsModalType = 'add' | 'edit' | 'view';

export type TFilterRevenueGroups = {
  itemGroupRevenueCode: string | null;
  itemGroupRevenueRefName: string | null;
};
