export type TApplicationType = {
  applicationTypeCode: string;
  applicationTypeName: string;
} & TAuditInfo;
export type TApplicationTypeFields = keyof TApplicationType;
export type ApplicationTypeModalType = 'add' | 'edit' | 'view';

export type TFilterApplicationType = {
  applicationTypeCode: string;
  applicationTypeName: string;
};
