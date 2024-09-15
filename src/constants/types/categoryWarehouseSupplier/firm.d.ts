type TFirm = {
  id: string | null;
  maSoSp: number | null;
  tenSanPham: string | null;
  ghiChu: string | null;
};

export type TFirmFields = keyof TFirm;

export type FirmModalType = 'view' | 'add' | 'edit';
