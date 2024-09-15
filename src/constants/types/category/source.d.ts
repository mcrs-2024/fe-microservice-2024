type TSource = {
  id: string | null;
  visitSourceCode: string | null;
  visitSourceName: string | null;
} & TAuditInfo;
export type TSourceFields = keyof TSource;
export type SourceModalType = 'add' | 'edit' | 'view';

export type TFilterSource = {
  visitSourceCode: string | null;
  visitSourceName: string | null;
};
