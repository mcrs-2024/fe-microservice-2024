export type TCouponForm = {
  id: string | null;
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: string | null;
  toDate: string | null;
  suppliers: string | null;
  fromDate: string | null;
  totalMoney: number | null;
  status: number | null;
} & TAuditInfo;

export type TCouponFormFields = keyof TCouponForm;

export type TCouponFormModal = 'add' | 'edit' | 'view';

export type TFilterCouponForm = {
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: string | null;
  toDate: string | null;
  fromDate: string | null;
  status: string | null;
};
