export type APIResponse<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: T;
  code: number;
  message: string;
};
export type TPaginationResponse<T> = {
  content: T[];
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
export type TAuditInfo = {
  createdDate: string | null;
  modifiedDate: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
};

export type TOption = {
  label: string | null;
  value: number | string | null;
};
export type TPagination = {
  pageNum: number;
  pageSize: number;
};
