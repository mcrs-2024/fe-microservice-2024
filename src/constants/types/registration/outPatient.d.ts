export type TOutpatientAdmission = {
  id: string | null;
  patientName: string | null;
  patientAge: number | null;
  patientGender: string | null;
  fromDate: string | null;
  toDate: string | null;
  registrationId: string | null;
  status: string | null;
} & TAuditInfo;

export type TOutpatientAdmissionFields = keyof TOutpatientAdmission;

export type OutpatientAdmissionModalType = 'add' | 'view' | 'edit';

export type TFilterOutpatientAdmission = {
  patientName: string | null;
  fromDate: string | null;
  toDate: string | null;
  registrationId: string | null;
  status: string | null;
};
