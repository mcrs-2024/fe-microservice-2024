export type TAdmissionAreaCode = {
  id: string | null;
  admissionAreaCode: string | null;
  admissionAreaName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TAdmissionAreaCodeFields = keyof TAdmissionAreaCode;

export type AdmissionAreaCodeModalType = 'add' | 'view' | 'edit';

export type TFilterAdmissionAreaCode = {
  admissionAreaCode: string | null;
  admissionAreaName: string | null;
};
