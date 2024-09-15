type TWarehouseMedicine = {
  id: string | null;
  vat: number | null;
  baoQuan: string | null;
  chiTietPhieuId: number | null;
  description: string | null;
  donViTinh: string | null;
  hangSanXuatId: string | null;
  hoatChat: string | null;
  isBhyt: number | null;
  khoId: number | null;
  loaiThuoc: string | null;
  ngayHetHan: string | null;
  ngaySanXuat: string | null;
  nhaCungCapId: string | null;
  nhomThuoc: string | null;
  note: string | null;
  nuocSanXuatId: string | null;
  soLo: string | null;
  soLuongNhap: number | null;
  tenThuoc: string | null;
  thanhTien: number | null;
  thuocId: number | null;
  tonKho: number | null;
  donGiaNhap: number | null;
  donGiaXuat: number | null;
  donGia: number | null;
  phieuId: number | null;
  tinhTrang: string | null;
  hangSanXuat: string | null;
  nhaCungCap: string | null;
  nuocSanXuat: string | null;
  donViTinhId: number | null;
  dongGoi: string | null;
  nhapBanDau: number | null;
  soDangKy: string | null;
  baoChe: string | null;
  baoCheId: number | null;
  duocChinh: string | null;
  duocChinhId: number | null;
  giaTriHang: number | null;
  soLoNcc: string | null;
  soLuongDaXuat: number | null;
  soLuongHetHan: number | null;
  soLuongTraNcc: number | null;
  soLuongDuTru: number | null;
};

//export type TWarehouseMedicineFields = keyof TWarehouseMedicine;

export type WarehouseMedicineModelType = 'add' | 'edit' | 'view';

export type TFilterMedicine = {
  tenThuoc: string | null;
  hangSanXuat: string | null;
  ngaySanXuat: string | null;
  ngayHetHan: string | null;
};
