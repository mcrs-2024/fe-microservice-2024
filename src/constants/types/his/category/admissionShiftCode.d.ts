export type TAdmissionShiftCode = {
  id: string | null;
  admissionShiftCode: string | null;
  admissionShiftName: string | null;
  admissionShiftTime: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TAdmissionShiftCodeFields = keyof TAdmissionShiftCode;

export type AdmissionShiftCodeModalType = 'add' | 'view' | 'edit';

export type TFilterAdmissionShiftCode = {
  admissionShiftCode: string | null;
  admissionShiftName: string | null;
};
