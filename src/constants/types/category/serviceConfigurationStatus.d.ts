type TServiceConfigurationStatus = {
  id: string | null;
  icdChapterCode: string;
  icdChapterNameV: string;
  icdChapterNameE: string;
  active: number | null;
} & TAuditInfo;

export type TServiceConfigurationStatusFields =
  keyof TServiceConfigurationStatus;

export type ServiceConfigurationStatusModalType = 'add' | 'edit' | 'view';

export type TFilterServiceConfigurationStatus = {
  icdChapterNameV: string;
  icdTypeCode: string;
};
