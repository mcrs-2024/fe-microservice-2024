type TQualification = {
  qualificationTypeCode: string;
  qualificationTypeName: string;
} & TAuditInfo;
export type TQualificationFields = keyof TQualification;
export type QualificationModalType = 'add' | 'edit' | 'view';

export type TFilterQualification = {
  qualificationTypeCode: string;
  qualificationTypeName: string;
};
