export type TInsuranceDetailCode = {
  id: string | null;
  insuranceEntityDetailCode: string | null;
  insuranceEntityDetailName: string | null;
  percentageOfCoPayment: number | null;
  paymentUnit: string | null;
  seqNum: number | null;
} & TAuditInfo;

export type TInsuranceDetailCodeFields = keyof TInsuranceDetailCode;

export type InsuranceDetailCodeModalType = 'add' | 'view' | 'edit';

export type TFilterInsuranceDetailCode = {
  insuranceEntityDetailCode: string | null;
  insuranceEntityDetailName: string | null;
};
