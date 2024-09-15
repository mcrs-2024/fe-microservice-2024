export type TJobTitle = {
  id: string | null;
  name: string | null;
  name_en: string | null;
  Name_Un_Unicode: string | null;
} & TAuditInfo;

export type TJobTitleField = keyof TJobTitle;

export type JobTitleModalType = 'add' | 'view' | 'edit';

export type TJobTitleFilter = {
  name: string | null;
};
