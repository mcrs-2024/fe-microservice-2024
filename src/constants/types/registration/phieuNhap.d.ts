type TCoupon = {
  id: string | null;
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  suppliers: string | null;
  invoiceNumber: string | null;
  fromDate: string | null;
  toDate: string | null;
  totalMoney: number | null;
  status: number | null;
};

export type { TCoupon };

export type TFilterCoupon = {
  couponCode: string | null;
  headline: string | null;
  importWarehouse: string | null;
  suppliers: string | null;
  invoiceNumber: string | null;
  suppliers: string | null;
};

export type TCouponModal = 'add' | 'view' | 'edit';
