type TRegistration = {
  medicalCode: string | null;
  medicalName: string | null;
  seqNum: number | null;
  address: string | null;
  glandCode: number | null;
} & TAuditInfo;

export type TRegistrationFields = keyof TRegistration;

export type RegistrationModalType = 'add' | 'edit' | 'view';

export type TFilterRegistration = {
  registrationPlace: string | null;
  registrationRoute: string | null;
  registrationName: string | null;
};
