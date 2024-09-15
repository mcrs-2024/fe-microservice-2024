export type TRelativeCode = {
  id: string | null;
  relativeTypeId: string | null;
  relativeCode: string | null;
  relativeName: string | null;
  phone: string | null;
  birthday: string | null;
  street: string | null;
  provinceCode: string | null;
  districtCode: string | null;
  wardCode: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TRelativeCodeFields = keyof TRelativeCode;

export type RelativeCodeModalType = 'add' | 'view' | 'edit';

export type TFilterRelativeCode = {
  relativeCode: string | null;
  relativeName: string | null;
};
