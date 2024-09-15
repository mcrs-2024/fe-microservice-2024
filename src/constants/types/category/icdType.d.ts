type TICDType = {
  id: string | null;
  icdTypeCode: string | null;
  icdTypeName: string | null;
  seqNum: number | null;
};

export type TICDTypeFields = keyof TICDType;

export type ICDTypeModalType = 'add' | 'edit' | 'view';

export type TFilterICDType = {
  icdTypeCode: string | null;
  icdTypeName: string | null;
};
