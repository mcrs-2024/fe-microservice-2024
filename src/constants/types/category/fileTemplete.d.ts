export type TFileTemplate = {
  fileTemplateId: string | null;
  fileTemplateRefName: string | null;
} & TAuditInfo;

export type TFileTemplateFields = keyof TFacility;

export type FileTemplateModalType = 'add' | 'edit' | 'view';

export type TFilterFileTemplate = {
  fileTemplateRefName: string | null;
};
