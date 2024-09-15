import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';

export const getColumns = (t: any): ColumnsType<TInventoryDetails> => [
  {
    title: t('STT'),
    dataIndex: 'id',
    width: 200,
    render(_, __, index) {
      return index + 1;
    },
  },
  { title: t('Product Code'), dataIndex: 'masanpham', width: 200 },
  { title: t('Batch No'), dataIndex: 'soLo', width: 200 },
  { title: t('Medicine Name'), dataIndex: 'tenThuoc', width: 200 },
  { title: t('Unit'), dataIndex: 'donViTinh', width: 200 },
  { title: t('Medicine Source'), dataIndex: 'nguonThuoc', width: 200 },
  { title: t('Pharmacological'), dataIndex: 'duocTinh', width: 200 },
  { title: t('status'), dataIndex: 'tinhTrang', width: 200 },
  { title: t('Active Ingredient'), dataIndex: 'hoatChat', width: 200 },
  { title: t('Content'), dataIndex: 'hamLuong', width: 200 },
  { title: t('Dosage Form'), dataIndex: 'dangBaoChe', width: 200 },
  { title: t('PM Inventory'), dataIndex: 'soLuongTonPM', width: 200 },
  { title: t('Fill'), dataIndex: 'fill', width: 200 },
  { title: t('Actual Inventory'), dataIndex: 'soLuongTonThuc', width: 200 },
  {
    title: t('Difference Quantity'),
    dataIndex: 'soLuongChenhLech',
    width: 200,
  },
  { title: t('Import Price'), dataIndex: 'donGiaNhap', width: 200 },
  { title: t('Goods Value'), dataIndex: 'giaTriHang', width: 200 },
  { title: t('VAT(%)'), dataIndex: 'vat', width: 200 },
  { title: t('Export Price'), dataIndex: 'donGiaXuat', width: 200 },
  { title: t('Import Date'), dataIndex: 'ngayNhap', width: 200 },
  { title: t('Manufacturing Date'), dataIndex: 'ngaySanXuat', width: 200 },
  { title: t('Expiration Date'), dataIndex: 'ngayHetHan', width: 200 },
  {
    title: t('Storage Conditions'),
    dataIndex: 'dieuKienBaoQuan',
    width: 200,
  },
  { title: t('Supplier'), dataIndex: 'nhaCungCap', width: 200 },
  { title: t('Manufacturer'), dataIndex: 'hangSanXuat', width: 200 },
  { title: t('Registration Number'), dataIndex: 'soDangKi', width: 200 },
  { title: t('Supplier Batch No'), dataIndex: 'soLoNCC', width: 200 },
  { title: t('Note'), dataIndex: 'ghiChu', width: 200 },
];
