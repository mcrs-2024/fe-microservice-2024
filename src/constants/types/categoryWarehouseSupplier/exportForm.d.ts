export type TExportForm = {
  id: string | null;
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: number | null;
  toDate: string | null;
  fromDate: string | null;
  totalMoney: 1;
} & TAuditInfo;

export type TExportFormFields = keyof TExportForm;

export type TExportFormModal = 'add' | 'edit' | 'view';

export type TFilterExportForm = {
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: string | null;
  toDate: string | null;
  fromDate: string | null;
  status: string | null;
};
