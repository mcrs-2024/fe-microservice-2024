export type TPatientSubject = {
  id: string | null;
  patientSubjectsCode: string | null;
  patientSubjectsName: string | null;
  type: string | null;
  seqNum: number | null;
};

export type TPatientSubjectFields = keyof TPatientSubject;

export type PatientSubjectModalType = 'add' | 'view' | 'edit';

export type TFilterPatientSubject = {
  patientSubjectsCode: string | null;
  patientSubjectsName: string | null;
};
