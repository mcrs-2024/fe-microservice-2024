export type TVatInfo = {
  id: string | null;
  companyName: string | null;
  taxCode: string | null;
  companyAddress: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TVatInfoFields = keyof TVatInfo;

export type vatInfoModalType = 'add' | 'view' | 'edit';

export type TFilterVatInfo = {
  companyName: string | null;
  taxCode: string | null;
  companyAddress: string | null;
};
