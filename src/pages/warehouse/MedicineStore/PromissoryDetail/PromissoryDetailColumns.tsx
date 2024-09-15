import { useTranslation } from 'react-i18next';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnType as AntdColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
interface CustomColumnType<T> extends AntdColumnType<T> {
  inputType?: 'number' | 'text' | 'date';
}
export const getColumns = (t: any): CustomColumnType<TInventoryDetails>[] => [
  {
    title: t('STT'),
    dataIndex: 'id',
    width: 200,
    render(_, __, index) {
      return index + 1;
    },
  },
  { title: t('Batch No'), dataIndex: 'soLo', width: 200, inputType: 'text' },
  {
    title: t('Medicine Name'),
    dataIndex: 'tenThuoc',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Supplier Batch No'),
    dataIndex: 'soLoNCC',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Expiration Date'),
    dataIndex: 'ngayHetHan',
    width: 200,
    inputType: 'date',
    // render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
  },
  { title: t('Unit'), dataIndex: 'donViTinh', width: 200, inputType: 'text' },
  {
    title: t('Quantity Input'),
    dataIndex: 'soLuongNhap',
    width: 200,
    inputType: 'number',
  },
  {
    title: t('Import Price'),
    dataIndex: 'donGiaNhap',
    width: 200,
    inputType: 'number',
  },
  {
    title: t('Total Before VAT'),
    dataIndex: 'ThanhTienTruocVat',
    width: 200,
    inputType: 'number',
  },
  { title: t('VAT(%)'), dataIndex: 'vat', width: 200, inputType: 'number' },
  {
    title: t('Total After VAT'),
    dataIndex: 'ThanhTienSauVat',
    width: 200,
    inputType: 'number',
  },
  {
    title: t('Sale Price'),
    dataIndex: 'DonGiaBan',
    width: 200,
    inputType: 'number',
  },
  {
    title: t('Auction Decision'),
    dataIndex: 'QuyetDinhThau',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Auction Note'),
    dataIndex: 'GhiChuThau',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Import Date'),
    dataIndex: 'ngayNhap',
    width: 200,
    inputType: 'date',
    // render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
  },
  {
    title: t('Product Code'),
    dataIndex: 'masanpham',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Pharmacological'),
    dataIndex: 'duocTinh',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Dosage Form'),
    dataIndex: 'dangBaoChe',
    width: 200,
    inputType: 'text',
  },
  {
    title: t('Active Ingredient'),
    dataIndex: 'hoatChat',
    width: 200,
    inputType: 'text',
  },
  { title: t('Note'), dataIndex: 'ghiChu', width: 200, inputType: 'text' },
];
