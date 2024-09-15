type TExports = {
  id: string | null;
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: string | null;
  fromDate: string | null;
  status: number | null;
  toDate: string | null;
  totalMoney: number | null;
};

export type { TExports };

export type TFilterExport = {
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
};

export type TExportModal = 'add' | 'view' | 'edit';
