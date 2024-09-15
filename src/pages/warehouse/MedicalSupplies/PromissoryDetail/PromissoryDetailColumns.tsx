import { useTranslation } from 'react-i18next';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
  { title: t('Batch No'), dataIndex: 'soLo', width: 200 },
  { title: t('Medicine Name'), dataIndex: 'tenThuoc', width: 200 },
  { title: t('Supplier Batch No'), dataIndex: 'soLoNCC', width: 200 },
  { title: t('Expiration Date'), dataIndex: 'ngayHetHan', width: 200 },
  { title: t('Unit'), dataIndex: 'donViTinh', width: 200 },
  { title: t('Quantity Input'), dataIndex: 'soLuongNhap', width: 200 },
  { title: t('Import Price'), dataIndex: 'donGiaNhap', width: 200 },
  { title: t('Total Before VAT'), dataIndex: 'ThanhTienTruocVat', width: 200 },
  { title: t('VAT(%)'), dataIndex: 'vat', width: 200 },
  { title: t('Total After VAT'), dataIndex: 'ThanhTienSauVat', width: 200 },
  { title: t('Sale Price'), dataIndex: 'DonGiaBan', width: 200 },
  { title: t('Auction Decision'), dataIndex: 'QuyetDinhThau', width: 200 },
  { title: t('Auction Note'), dataIndex: 'GhiChuThau', width: 200 },
  { title: t('Import Date'), dataIndex: 'ngayNhap', width: 200 },
  { title: t('Product Code'), dataIndex: 'masanpham', width: 200 },
  { title: t('Pharmacological'), dataIndex: 'duocTinh', width: 200 },
  { title: t('Dosage Form'), dataIndex: 'dangBaoChe', width: 200 },
  { title: t('Active Ingredient'), dataIndex: 'hoatChat', width: 200 },
  { title: t('Note'), dataIndex: 'ghiChu', width: 200 },
  {
    title: (
      <Button
        icon={<PlusSquareOutlined />}
        style={{ color: 'red', fontSize: '20px' }}
      ></Button>
    ),
    width: 100,
    dataIndex: 'action',
    fixed: 'right',
    align: 'center',
  },
];
