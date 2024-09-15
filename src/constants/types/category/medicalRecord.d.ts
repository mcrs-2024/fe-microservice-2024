type TMedicalRecord = {
  sst: string;
  label: string;
  Specialist: string;
  PrivateUse: string;
};
export type TCategoryMedicalRecordFields = keyof TCategory;
export type CategoryMedicalRecordModalType = 'add' | 'edit' | 'view';

export type TFilterCategoryMedicalRecord = {
  sst: string;
  label: string;
  Specialist: string;
  PrivateUse: string;
};
