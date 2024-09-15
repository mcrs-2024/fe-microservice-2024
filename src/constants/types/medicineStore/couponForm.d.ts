export type TCouponForm = {
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  exportWarehouse: string | null;
  invoiceNumber: string | null;
  toDate: string | null;
  fromDate: string | null;
  totalMoney: number | null;
} & TAuditInfo;

export type TCouponFormFields = keyof TCouponForm;
export type ChapterModalType = 'add' | 'edit' | 'view';

export type TFilterCouponForm = {
  icdTypeCode: string;
  icdChapterNameV: string;
};
