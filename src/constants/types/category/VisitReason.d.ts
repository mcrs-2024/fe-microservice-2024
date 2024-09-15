type TVisitReason = {
  visitReasonCode: string;
  name: string;
} & TAuditInfo;
export type TVisitReasonFields = keyof TVisitReason;
export type VisitReasonModalType = 'add' | 'edit' | 'view';

export type TFilterVisitReason = {
  visitReasonCode: string;
  name: string;
};
