type TWarehouseLocation = {
  id: string | null;
  icdChapterCode: string;
  icdChapterNameV: string;
  icdChapterNameE: string;
  active: number | null;
} & TAuditInfo;
export type TWarehouseLocationFields = keyof TWarehouseLocation;
export type WarehouseLocationModalType = 'add' | 'edit' | 'view';

export type TFilterWarehouseLocation = {
  icdChapterNameV: string;
  icdTypeCode: string;
};
