type TRegulation = {
  id: string | null;
  name: string | null;
  description: string | null;
};

export type TRegulationFields = keyof TRegulation;

export type RegulationModalType = 'view' | 'add' | 'edit';
