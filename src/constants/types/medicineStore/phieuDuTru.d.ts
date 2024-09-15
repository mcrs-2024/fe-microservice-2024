type TProvisional = {
  id: string | null;
  maPhieu: string | null;
  khoXuat: string | null;
  ngayNhapDen: string | null;
  ngayNhapTu: string | null;
  tinhTrang: string | null;
  khoNhap: string | null;
  tieuDe: string | null;
};

export { TProvisional };

export type ProvisionalModalType = 'add' | 'view' | 'edit';

export type ProvisionalFilter = {
  khoXuat: string | null;
  ngayNhapDen: string | null;
  ngayNhapTu: string | null;
  tinhTrang: string | null;
  khoNhap: string | null;
  tieuDe: string | null;
};
