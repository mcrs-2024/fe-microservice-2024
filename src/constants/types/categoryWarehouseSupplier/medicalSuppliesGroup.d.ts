type TMedicalSuppliesGroup = {
  id: string | null;
  name: string | null;
  ghiChu: string | null;
};

export type TMedicalSuppliesGroupFields = keyof TMedicalSuppliesGroup;

export type MedicalSuppliesGroupModalType = 'view' | 'add' | 'edit';
