import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloseOutlined,
  PrinterOutlined,
  SaveOutlined,
  ToTopOutlined,
} from '@ant-design/icons';
import { Button, Card, Row, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableEditable from 'src/components/TableEditable';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { useInventory } from 'src/helpers/api/medicineStore/inventory';
import useFilter from 'src/hooks/useFilter';

import { getColumns } from './InventoryColumns';

const InventoryDetails = () => {
  const { filter, setFilter, pagination, onPaginationChange } =
    useFilter<TInventoryDetails>({
      defaultFilter: {
        maPhieu: '',
        tieuDe: '',
        khoKiemKe: 0,
        nguoilapPhieu: '',
        nguoiKiemKe: '',
        ThoiGianKiemKe: '',
        tongGiaTri: 0,
        GhiChu: '',
        TrangThai: '',
      },
    });
  const { t } = useTranslation();
  const columns = getColumns(t);
  const { data: inventory, isLoading } = useInventory(pagination);

  const inputSearch: InputProps[] = [
    {
      label: t('Form Code'),
      type: TYPE_FIELD.TEXT,
      name: 'maPhieu',
      allowClear: true,
      value: filter.maPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          maPhieu: e.target.value,
        }),
    },
    {
      label: t('Form Title'),
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
      label: t('Inventory Warehouse'),
      name: 'khoKiemKe',
      type: TYPE_FIELD.TEXT,
      allowClear: true,
      value: filter.khoKiemKe,
      onChange: (value: number | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          khoKiemKe: newValue,
        });
      },
    },
    {
      label: t('Form Creator'),
      name: 'nguoilapPhieu',
      type: TYPE_FIELD.TEXT,
      allowClear: true,
      value: filter.nguoilapPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          nguoilapPhieu: e.target.value,
        }),
    },
    {
      label: t('Inventory Person'),
      type: TYPE_FIELD.TEXT,
      value: filter.nguoiKiemKe,
      allowClear: true,
      name: 'nguoiKiemKe',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          nguoiKiemKe: e.target.value,
        }),
    },
    {
      label: t('Inventory Time'),
      name: 'ThoiGianKiemKe',
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      value: filter.ThoiGianKiemKe,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          ThoiGianKiemKe: newValue,
        });
      },
    },
    {
      label: t('Total Value'),
      name: 'tongGiaTri',
      value: filter.tongGiaTri,
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
    {
      label: t('status'),
      name: 'TrangThai',
      value: filter.TrangThai,
      type: TYPE_FIELD.TEXT,
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
          title={t('Inventory Information')}
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
              icon={<CloseOutlined />}
              style={{
                marginRight: '1%',
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              {t('Cancel')}
            </Button>
            <ButtonCustom.Edit
              icon={<SaveOutlined />}
              style={{
                marginRight: '1%',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              {t('Save')}
            </ButtonCustom.Edit>
            <ButtonCustom.Edit
              icon={<ToTopOutlined />}
              style={{ marginRight: '1%' }}
            >
              {t('Send Form')}
            </ButtonCustom.Edit>
            <ButtonCustom.Edit type='primary'>
              {t('Complete')}
            </ButtonCustom.Edit>
          </Row>
        </Card>
        <TableEditable
          title={t('Inventory Check Table')}
          extra={
            <>
              <ButtonCustom.Edit
                type='primary'
                icon={<PrinterOutlined />}
                onClick={() => {}}
              >
                {t('Add')}
              </ButtonCustom.Edit>
            </>
          }
          columns={columns}
          data={inventory?.data?.content || []}
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
        ></TableEditable>
      </Space>
    </>
  );
};

export default InventoryDetails;
