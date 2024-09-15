type TIcdConfiguration = {
  id: string | null;
  icdChapterCode: string;
  icdChapterNameV: string;
  icdChapterNameE: string;
  active: number | null;
} & TAuditInfo;
export type TIcdConfigurationFields = keyof TIcdConfiguration;
export type IcdConfigurationModalType = 'add' | 'edit' | 'view';

export type TFilterIcdConfiguration = {
  icdChapterNameV: string;
  icdTypeCode: string;
};
