type TDocumentProtection = {
  id: string | null;
  documentProtectionLevelName: string;
  level: number | null;
} & TAuditInfo;
export type TDocumentProtectionFields = keyof TDocumentProtection;
export type DocumentProtectionModalType = 'add' | 'edit' | 'view';

export type TFilterDocumentProtection = {
  documentProtectionLevelName: string;
};
