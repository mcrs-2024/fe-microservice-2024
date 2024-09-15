type TCategory = {
  id: string | null;
  icdGroupCode: string | null;
  icdGroupNameE: string | null;
  icdGroupNameV: string | null;
  icdBlocksCodes: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TCategoryFields = keyof TCategory;

export type CategoryModalType = 'add' | 'edit' | 'view';

export type TFilterCategory = {
  icdGroupCode: string | null;
  icdGroupNameV: string | null;
  icdBlocksCodes: string | null;
};
