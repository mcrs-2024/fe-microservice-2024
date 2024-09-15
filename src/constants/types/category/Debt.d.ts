type TDebt = {
  id: string | null;
  policyThirdPartyId: string | null;
  organisationId: string | null;
  contactName: string | null;
  contactTel: string | null;
  contactFax: string | null;
  contactEmail: string | null;
  contractRenewalDate: string | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
  contractDrawnUpBy: string | null;
  contractSignedBy: string | null;
  contractSignDate: string | null;
  comment: string | null;
  accountingCustomerId: string | null;
  policyTypeRcd: string | null;
  facilityId: string | null;
} & TAuditInfo;
export type TDebtFields = keyof TDebt;
export type DebtModalType = 'add' | 'edit' | 'view';

export type TFilterDebt = {
  organisationId: string | null;
  contactName: string | null;
};
