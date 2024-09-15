export type TCatUsers = {
  id: string | null;
  facilityID: string | null;
  username: string | null;
  passwordHash: string | null;
  empID: string | null;
  comment: string | null;
  locked: string | null;
  active: string | null;
  lastLoginDate: string | null;
  lastPasswordChangedDate: string | null;
  failedLoginCount: string | null;
  lastMenuUser: string | null;
  lastModuleKey: string | null;
  eSignatureKey: string | null;
  eSignaturePIN: string | null;
  eSignatureImage: string | null;
  isUsingESignature: string | null;
} & TAuditInfo;

export type TCatUsersFields = keyof TCatUsers;

export type CatUsersModalType = 'add' | 'edit' | 'view';

export type TFilterCatUsers = {
  username: string | null;
};
