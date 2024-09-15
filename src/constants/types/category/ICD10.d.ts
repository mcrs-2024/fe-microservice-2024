type TIcd10 = {
  id: string | null;
  icdCode: string | null;
  icdNameE: string | null;
  icdNameV: string | null;
  icdBlocksId: string | null;
  icdGroupId: string | null;
  icd10Mapping: string | null;
  seqNum: number | null;
  billable: boolean | null;
};
export type TIcd10Fields = keyof TIcd10;

export type Icd10ModalType = 'add' | 'edit' | 'view';

export type TFilterIcd10 = {
  icdCode: string | null;
  icdName: string | null;
};
