export type TCountry = {
  id: string | null;
  name: string | null;
  nameUnUnicode: string | null;
} & TAuditInfo;

export type TCountryField = keyof TCountry;

export type CountryModalType = 'add' | 'view' | 'edit';

export type TCountryFilter = {
  name: string | null;
};
