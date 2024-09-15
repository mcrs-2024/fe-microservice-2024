type TSupplier = {
  id: string | null;
  description: string | null;
  name: string | null;
  address: string | null;
  email: string | null;
  representative: string | null;
  phone: string | null;
};

export type TSupplierFields = keyof TSupplier;

export type SupplierModalType = 'view' | 'add' | 'edit';
