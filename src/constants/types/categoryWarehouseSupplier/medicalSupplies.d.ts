type TMedicalSupplies = {
  id: string | null;
  description: string | null;
  donViApKQDTId: number | null;
  donViTINHId: number | null;
  giaTriBHChiTra: number | null;
  hangSanXUATId: number | null;
  maBaoHiem: string | null;
  maHang: string | null;
  nhaThau: string | null;
  nhomTCKT: string | null;
  nhomVTYTId: number | null;
  nuocSanXUATId: number | null;
  quyCachId: number | null;
  tenTheoBaoHiem: string | null;
  tenTheoThuongMai: string | null;
  maNhomBaoHiem: string | null;
};

export type TMedicalSuppliesFields = keyof TMedicalSupplies;

export type MedicalSuppliesModalType = 'view' | 'add' | 'edit';
