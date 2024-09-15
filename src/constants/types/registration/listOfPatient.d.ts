import { TAuditInfo } from '../common';

export type TListOfPatient = {
  id: string | null;
  patientName: string | null;
  patientAge: number | null;
  patientGender: string | null;
};

export type TListOfPatientFields = keyof TListOfPatient;

export type ListOfPatientModalType = 'add' | 'view' | 'edit';

export type TFilterListOfPatient = {
  patientName: string | null;
  patientAge: string | null;
  patientGender: string | null;
};
