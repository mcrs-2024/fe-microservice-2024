type TListOfWarehouseSupplier = {
  id: string | null;
  tenKho: string | null;
  moTa: string | null;
};

export type TListOfWarehouseSupplierFields = keyof TListOfWarehouseSupplier;

export type ListOfWarehouseSupplierModal = 'view' | 'add' | 'edit';

export type FilterListOfWarehouseSupplier = {
  tenKho: string | null;
};
