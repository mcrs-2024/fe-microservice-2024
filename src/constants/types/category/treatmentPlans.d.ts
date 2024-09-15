type TTreatmentPlans = {
  id: string | null;
  treatmentPlansCode: string;
  treatmentPlansName: string;
} & TAuditInfo;
export type TChapterFields = keyof TTreatmentPlans;
export type TreatmentPlansModalType = 'add' | 'edit' | 'view';

export type TFilterTreatmentPlans = {
  treatmentPlansCode: string;
  treatmentPlansName: string;
};
