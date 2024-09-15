export type TAllergin = {
  id: string | null;
  adverseReactionCauseTypeCode: string;
  name: string;
} & TAuditInfo;
export type TAllerginFields = keyof TAllergin;
export type AllerginModalType = 'add' | 'edit' | 'view';

export type TFilterAllergen = {
  name: string;
};
