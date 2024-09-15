export type TResearchArea = {
  id: string | null;
  researchAreaCode: string;
  researchAreaName: string;
} & TAuditInfo;
export type TResearchAreaFields = keyof TResearchArea;
export type ResearchAreaModalType = 'add' | 'edit' | 'view';

export type TFilterResearchArea = {
  researchAreaCode: string;
  researchAreaName: string;
};
