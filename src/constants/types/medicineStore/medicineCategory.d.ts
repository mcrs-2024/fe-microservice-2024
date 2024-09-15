type TWarehouseMedicineCategory = {
  id: string | null;
  tenKho: string | null;
  //maKho: string | null;
  moTa: string | null;
};

//danh sách thuốc:
type TMedicineCategory = {
  id: number | null;
  hamLuong: string | null;
  hoatChatId: number | null;
  isStend: boolean | null;
  ten: string | null;
  soDangKy: string | null;
  bhChiTra: number | null;
  hoatChat: string | null;
  duongDung: string | null;
  maLoaiBhyt: string | null;
  maBhyt: string | null;
  donViChinh: string | null;
  loaiThuoc: string | null;
};

//Danh mục loại thuốc
type TMedicineTypeCategory = {
  id: number | null;
  maLoaiThuoc: number | null;
  tenLoaiThuoc: string | null;
  moTa: string | null;
  createdBy: string | null;
};

export type TMedicineGroupCategory = {
  id: number | null;
  maLoaiThuoc: number | null;
  tenNhomThuoc: string | null;
  moTa: string | null;
  createdBy: string | null;
};

type THoatChatCategory = {
  id: number | null;
  maHoatChat: number | null;
  tenHoatChat: string | null;
  tuongTac: string | null;
  moTa: string | null;
  createdBy: string | null;
};

type TSupplierCategory = {
  id: number | null;
  nccId: number | null;
  nccName: string | null;
  diaChi: string | null;
  lienHe: string | null;
  ghiChu: string | null;
};

type TContractorCategory = {
  id: string | null;
  thuoc: string | null;
  soThau: string | null;
  quyetDinh: string | null;
  congBo: string | null;
  ghiChu: string | null;
  // tuNgay: string | null;
  // denNgay: string | null;
  // hanSoYTe: string | null;
  // soLuong: string | null;
};

export {
  TContractorCategory,
  THoatChatCategory,
  TMedicineCategory,
  TMedicineGroupCategory,
  TMedicineTypeCategory,
  TSupplierCategory,
  TWarehouseMedicineCategory,
};

export type TWarehouseMedicineCategoryFields = keyof TWarehouseMedicineCategory;

export type TWarehouseMedicineCategoryModel = 'add' | 'view' | 'edit';
export type TMedicineCategoryModal = 'add' | 'view' | 'edit';
export type TMedicineTypeCategoryModal = 'add' | 'view' | 'edit';
export type TMedicineGroupCategoryModal = 'add' | 'view' | 'edit';
export type THoatChatCategoryModal = 'add' | 'view' | 'edit';
export type TSupplierCategoryModal = 'add' | 'view' | 'edit';
export type TContractorCategoryModal = 'add' | 'view' | 'edit';

export type TFilterWarehouseMedicineCategory = {
  tenKho: string | null;
};
