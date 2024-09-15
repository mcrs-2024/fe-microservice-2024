type TPatientTreatment = {
  id: string | null;
  patientTreatmentTemplateCode: string | null;
  patientTreatmentTemplateName: string | null;
  progression: string | null;
  treatment: string | null;
  privateFlag: boolean | null;
} & TAuditInfo;

export type TPatientTreatmentFields = keyof TPatientTreatment;

export type PatientTreatmentModalType = 'add' | 'edit' | 'view';

export type TFilterPatientTreatment = {
  patientTreatmentTemplateName: string;
};
