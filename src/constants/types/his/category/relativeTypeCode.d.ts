export type TRelativeCodeType = {
  id: string | null;
  relativeTypeCode: string | null;
  relativeTypeName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TRelativeCodeTypeFields = keyof TRelativeCodeType;

export type RelativeCodeTypeModalType = 'add' | 'view' | 'edit';
