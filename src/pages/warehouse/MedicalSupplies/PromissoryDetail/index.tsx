import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloseOutlined,
  PrinterOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Button, Card, Row, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import { useInventory } from 'src/helpers/api/medicineStore/inventory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import useFilter from 'src/hooks/useFilter';

import { getColumns } from './PromissoryDetailColumns';

const PromissoryDetail = () => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { t } = useTranslation();
  const columns = getColumns(t);
  const { filter, setFilter, pagination, onPaginationChange } =
    useFilter<DetailPromissory>({
      defaultFilter: {
        maPhieu: '',
        tieuDe: '',
        NgayHoaDon: 0,
        SoHoaDon: '',
        KhoNhap: '',
        TinhTrangPhieu: '',
        NguoiLapPhieu: '',
        KhoXuat: '',
        NguoiGiao: '',
        nguoiKiemKe: '',
        NguoiNhan: '',
        NgayNhanDuTru: 0,
        ThoiGianHoanThanh: 0,
        tongGiaTri: 0,
        GhiChu: '',
      },
    });

  const { data: inventory, isLoading } = useInventory(pagination);

  const inputSearch: InputProps[] = [
    {
      label: t('Receipt_ID'),
      type: TYPE_FIELD.TEXT,
      name: 'maPhieu',
      allowClear: true,
      disabled: true,
      value: filter.maPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          maPhieu: e.target.value,
        }),
    },
    {
      label: t('Receipt Title'),
      type: TYPE_FIELD.TEXT,
      name: 'tieuDe',
      allowClear: true,
      value: filter.tieuDe,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          tieuDe: e.target.value,
        }),
    },
    {
      label: t('Bill_date'),
      name: 'NgayHoaDon',
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      value: filter.NgayHoaDon,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          NgayHoaDon: newValue,
        });
      },
    },
    {
      label: t('Some_bills'),
      type: TYPE_FIELD.TEXT,
      name: 'SoHoaDon',
      allowClear: true,
      value: filter.SoHoaDon,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          SoHoaDon: e.target.value,
        }),
    },
    {
      label: t('Warehouse_import'),
      type: TYPE_FIELD.SELECT,
      value: filter.KhoNhap,
      allowClear: true,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse?.id ?? '',
          label: warehouse?.tenKho ?? '',
        }),
      ),
      name: 'KhoNhap',
      onChange: (value: string | null) => {
        setFilter({
          ...filter,
          KhoNhap: value,
        });
      },
    },
    {
      label: t('billStatus'),
      type: TYPE_FIELD.TEXT,
      name: 'TinhTrangPhieu',
      allowClear: true,
      disabled: true,
      value: filter.SoHoaDon,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          TinhTrangPhieu: e.target.value,
        }),
    },
    {
      label: t('exportWarehouse'),
      type: TYPE_FIELD.SELECT,
      value: filter.KhoXuat,
      allowClear: true,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse?.tenKho ?? '',
          label: warehouse?.tenKho ?? '',
        }),
      ),
      name: 'khoXuat',
      onChange: (value: string | null) => {
        setFilter({
          ...filter,
          KhoXuat: value,
        });
      },
    },
    {
      label: t('Receipt Creator'),
      type: TYPE_FIELD.TEXT,
      name: 'NguoiLapPhieu',
      allowClear: true,
      value: filter.NguoiLapPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          NguoiLapPhieu: e.target.value,
        }),
    },
    {
      label: t('Deliver'),
      type: TYPE_FIELD.TEXT,
      name: 'NguoiGiao',
      allowClear: true,
      value: filter.NguoiGiao,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          NguoiGiao: e.target.value,
        }),
    },
    {
      label: t('Receiver'),
      type: TYPE_FIELD.TEXT,
      name: 'NguoiNhan',
      allowClear: true,
      value: filter.NguoiNhan,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          NguoiNhan: e.target.value,
        }),
    },
    {
      label: t('Estimated_date'),
      name: 'NgayNhanDuTru',
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      value: filter.NgayNhanDuTru,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          NgayNhanDuTru: newValue,
        });
      },
    },
    {
      label: t('Completion_time'),
      name: 'ThoiGianHoanThanh',
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      value: filter.ThoiGianHoanThanh,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          ThoiGianHoanThanh: newValue,
        });
      },
    },
    {
      label: t('Total Value'),
      name: 'tongGiaTri',
      value: filter.tongGiaTri,
      disabled: true,
      type: TYPE_FIELD.TEXT,
      allowClear: true,
      onChange: (value: number | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          tongGiaTri: newValue,
        });
      },
    },
    {
      label: t('Note'),
      name: 'GhiChu',
      value: filter.GhiChu,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          GhiChu: newValue,
        });
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card
          title={t('Entry_form_information')}
          style={{ paddingBottom: '1%' }}
        >
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <Row justify='end'>
            <Button
              type='primary'
              icon={<PrinterOutlined />}
              style={{ marginRight: '1%' }}
            >
              {t('Print_form')}
            </Button>
            <Button
              icon={<CloseOutlined />}
              style={{
                marginRight: '1%',
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              {t('Cancel')}
            </Button>
            <Button
              icon={<SaveOutlined />}
              style={{
                marginRight: '1%',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              {t('Save')}
            </Button>

            <Button> {t('Complete')}</Button>
          </Row>
        </Card>
        <Card title={t('medications_form')} style={{ paddingBottom: '1%' }}>
          <TableCustom
            columns={columns}
            data={[]}
            isLoading={isLoading}
            isRowSelection={true}
            pagination={{
              pageSize: inventory?.data?.pageSize,
              pageNum: inventory?.data?.pageNum,
              totalElements: inventory?.data?.totalElements,
              onChange: onPaginationChange,
            }}
            scroll={{ y: 300 }}
            showVisibleColumns={false}
          ></TableCustom>
        </Card>
      </Space>
    </>
  );
};

export default PromissoryDetail;
