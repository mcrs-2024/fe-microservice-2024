type TCategoryModule = {
  moduleCode: string | null;
  moduleName: string | null;
  moduleUrl: string | null;
  description: string | null;
} & TAuditInfo;
export type TCategoryModuleFields = keyof TCategoryModule;
export type CategoryModuleModalType = 'add' | 'edit' | 'view';

export type TFilterCategoryModule = {
  moduleCode: string | null;
  moduleName: string | null;
};
