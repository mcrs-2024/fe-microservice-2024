type TGuarantee = {
  id: string | null;
  personIndicator: string | null;
  personIndicatorSub: string | null;
  visitType: string | null;
  patientPricingClass: string | null;
  effectiveFromDate: string | null;
  effectiveToDate: string | null;
  seqNum: number | null;
} & TAuditInfo;

type TPersonIndicatorSub = {
  id: string | null;
  personIndicatorSubCode: string | null;
  personIndicator: string | null;
  personIndicatorSubName: string | null;
  seqNum: number | null;
  iconImage: string | null;
};

type TPatient = {
  id: string | null;
  patientPricingClassCode: string | null;
  patientPricingClassRefName: string | null;
  seqNum: number | null;
};

type TVisitType = {
  id: string | null;
  visitTypeCode: string | null;
  visitTypeRefName: string | null;
};

export type TGuaranteeFields = keyof TGuarantee;

export type GuaranteeModalType = 'add' | 'edit' | 'view';

export type TFilterGuarantee = {
  personIndicator: string | null;
  patientPricingClass: string | null;
  visitType: string | null;
  personIndicatorSub: string | null;
  effectiveFromDate: string | null;
  effectiveToDate: string | null;
};
