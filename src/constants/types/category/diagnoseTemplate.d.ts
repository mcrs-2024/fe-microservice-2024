type TDiagnoseTemplate = {
  id: string | null;
  diagnoseTemplateTitle: string | null;
  clinicalSpecialtyId: string | null;
  familyMedicalHistory: string | null;
  medicalHistory: string | null;
  allergyHistory: string | null;
  diseaseProgression: string | null;
  clinicalSummary: string | null;
  generalCondition: string | null;
  bodyParts: string | null;
  treated: string | null;
  notes: string | null;
  privateFlag: boolean | null;
} & TAuditInfo;
export type TDiagnoseTemplateFields = keyof TDiagnoseTemplate;
export type DiagnoseTemplateModalType = 'add' | 'edit' | 'view';

export type TFilterDiagnoseTemplate = {
  diagnoseTemplateTitle: string | null;
  clinicalSpecialtyId: string | null;
};
