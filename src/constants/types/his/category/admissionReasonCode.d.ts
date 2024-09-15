export type TAdmissionReasonCode = {
  id: string | null;
  admissionReasonCode: string | null;
  admissionReasonName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TAdmissionReasonCodeFields = keyof TAdmissionReasonCode;

export type AdmissionReasonCodeModalType = 'add' | 'view' | 'edit';

export type TFilterAdmissionReasonCode = {
  admissionReasonCode: string | null;
  admissionReasonName: string | null;
};
