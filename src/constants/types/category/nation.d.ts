export type TNation = {
  id: string | null;
  name: string | null;
  nameUnUnicode: string | null;
} & TAuditInfo;

export type TNationField = keyof TNation;

export type NationModalType = 'add' | 'view' | 'edit';

export type TNationFilter = {
  name: string | null;
};
