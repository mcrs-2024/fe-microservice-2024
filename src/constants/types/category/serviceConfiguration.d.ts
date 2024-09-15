type TServiceConfig = {
  id: string | null;
  visitTypeCode: string | null;
  clinicalSpecialtyId: string | null;
  serviceId: string | null;
  employeeId: string | null;
  departmentId: string | null;
  availableFlag: boolean | null;
  comment: string | null;
} & TAuditInfo;

export type TServiceConfigFields = keyof TServiceConfig;

export type ServiceConfigModalType = 'add' | 'edit' | 'view';

export type TFilterServiceConfig = {
  specialist: string;
  staff: string;
  serviceName: string;
  categoryName: string;
  specialtyName: string;
  typeOfExam: string;
  departmentTH: string;
  performer: string;
  interactRank: string;
  order: string;
  note: string;
  isActive: string;
};
