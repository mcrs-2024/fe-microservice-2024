const sampleData = [
  {
    id: '1',
    medicineId: 206,
    medicineWarehouseType: 'Kho xét nghiệm',
    warehouseOrderId: '0000000000-01012026-048',
    medicineName: 'Dimedrol 10mg/ml (100 ống/H)',
    medicineMeasure: 'Viên',
    medicineSource: null,
    medicineMainPharmacy: null,
    medicineActiveElement: null,
    medicineDosageForm: null,
    medicineLeftover: 5,
    medicinePriceIn: 0,
    medicinePriceOut: 123,
    medicineSupplierID: null,
    medicineValuesOfGoods: null,
    medicineVAT: 0,
    medicineDateImportFrom: '03/01/2024',
    medicineProductDate: '03/01/2024',
    medicineExperiation: '01/01/2026',
    medicineStatus: 'Gần hết hàng',
    medincineSell: 0,
    medicineEstimatedQuantity: 0,
    medicineExpectedQuantity: 0,
    medicineDateImportTo: null,
    //danh sách thuốc:
    thuocId: '1',
    tenThuoc: 'string',
    maThuocTheoBHYT: 'string',
    maNhomThuocTheoBHYT: 'string',
    soDangKy: 'string',
    duongDung: 'string',
    loaiThuoc: 'string',
    nhomThuoc: 'string',
    hoatChat: 'string',
    hamLuong: 'string',
    donViChinh: 'string',
    duocChinh: 'string',
    baoHiemChiTra: 1,
    dangBaoChe: 'string',
    nuocSanXuat: 'string',
    hangSanXuat: 'string',
    laStend: 'string',
  },
];

const DANH_SACH_KHO = [
  {
    id: '1',
    tenKho: 'Các Kho nhà cung cấp',
    maKho: '1',
    moTa: 'Các kho của nhà cung cấp',
  },
];

//danh sách loại thuốc
const DANH_SACH_LOAI_THUOC = [
  {
    maLoaiThuoc: '1',
    tenLoai: 'string',
    moTa: 'string',
    nguoiTao: 'string',
  },
];

//danh sách nhóm thuốc
const DANH_SACH_NHOM_THUOC = [
  {
    maLoaiThuoc: '1',
    tenNhomThuoc: 'string',
    moTa: 'string',
    nguoiTao: 'string',
  },
];

//danh sách hoạt chất
const DANH_SACH_HOAT_CHAT = [
  {
    maHoatChat: '1',
    tenNhomThuoc: 'string',
    tuongTac: 'string',
    moTa: 'string',
    nguoiTao: 'string',
  },
];

//danh sách nhà cung cấp
const DANH_SACH_NCC = [
  {
    maNCC: '1',
    tenNCC: 'string',
    diaChi: 'string',
    lienHe: 'string',
    ghiChu: 'string',
  },
];

//danh sách nhà thầu
const DANH_SACH_NHA_THAU = [
  {
    id: '1',
    thuoc: 'string',
    soThau: 'string',
    quyetDinh: 'string',
    congBo: 'string',
    ghiChu: 'string',
  },
];

const PHIEU_NHAP = {
  id: 1,
  couponCode: 'string',
  headline: 'string',
  importWarehouse: 'string',
  suppliers: 'string',
  invoiceNumber: 'string',
  formDate: 'string',
  status: 1,
  toDate: 'string',
  totalMoney: 'string',
};

const PHIEU_DU_TRU = {
  id: '1',
  maPhieu: 'Test data',
  khoNhap: 'Test data',
  khoXuat: 'Test data',
  tieuDePhieu: 'Test data',
  tenNhom: 'Test data',
  trangThaiPhieu: 'Test data',
  ngayNhapPhieu: 'Test data',
  ngayHoanThanhNhap: 'Test data',
  nguoiLapPhieu: 'Test data',
  nguoiGiao: 'Test data',
  nguoiNhan: 'Test data',
  nguoiDuTru: 'Test data',
  nguoiDuyet: 'Test data',
  tongGiaTri: 1000,
  ghiChu: 'Test data',
};

export {
  DANH_SACH_HOAT_CHAT,
  DANH_SACH_KHO,
  DANH_SACH_LOAI_THUOC,
  DANH_SACH_NCC,
  DANH_SACH_NHA_THAU,
  DANH_SACH_NHOM_THUOC,
  PHIEU_DU_TRU,
  PHIEU_NHAP,
  sampleData,
};
