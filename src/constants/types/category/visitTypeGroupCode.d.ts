type TVisitTypeGroupCode = {
  id: string | null;
  visitTypeGroupCode: string | null;
  visitTypeGroupRefName: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TVisitTypeGroupCodeFields = keyof TVisitTypeGroupCode;

export type VisitTypeGroupCodeModalType = 'add' | 'edit' | 'view';

export type TFilterVisitTypeGroupCode = {
  visitTypeGroupCode: string | null;
  visitTypeGroupRefName: string | null;
};
