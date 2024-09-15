type TActiveSubstance = {
  id: string;
  groupActiveSubstance: string;
  codeHC01: string;
  codeHC02: string;
  nameHC01: string;
  nameHC02: string;
  interactRank: string;
  interactRankName: string;
  start: string;
  interactAndEffect: string;
  solution: string;
  reference: string;
};
export type TActiveSubstanceFields = keyof TActiveSubstance;
export type ActiveSubstanceModalType = 'add' | 'edit' | 'view';

export type TFilterActiveSubstance = {
  groupActiveSubstance: string;
  codeHC01: string;
  codeHC02: string;
  nameHC01: string;
  nameHC02: string;
  interactRank: string;
  interactRankName: string;
  start: string;
  interactAndEffect: string;
  solution: string;
  reference: string;
};
