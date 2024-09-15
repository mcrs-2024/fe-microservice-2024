export type TEthnicity = {
  id: string;
  name: string | null;
  nameUnUnicode: string | null;
} & TAuditInfo;

export type TEthnicityFields = keyof TEthnicity;

export type EthnicityModalType = 'add' | 'view' | 'edit';

export type TEthnicityFilter = {
  name: string | null;
};
