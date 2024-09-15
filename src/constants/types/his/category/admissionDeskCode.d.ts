export type TAdmissionDeskCode = {
  id: string | null;
  admissionDeskCode: string | null;
  admissionDeskName: string | null;
  admissionAreaId: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TAdmissionDeskCodeFields = keyof TAdmissionDeskCode;

export type AdmissionDeskCodeModalType = 'add' | 'view' | 'edit';

export type TFilterAdmissionDeskCode = {
  admissionDeskCode: string | null;
  admissionDeskName: string | null;
};
