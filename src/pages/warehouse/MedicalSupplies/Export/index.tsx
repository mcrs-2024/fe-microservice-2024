import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  message,
  Popconfirm,
  Row,
  Space,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TExportModal,
  TExports,
  TFilterExport,
} from 'src/constants/types/medicineStore/export';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import exportFormApi, {
  useExportForm,
} from 'src/helpers/api/medicineStore/export';
import { useGetAllListOfWarehouse } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import useFilter from 'src/hooks/useFilter';

import ExportModal from './ExportModal/ExportModal';

const Export = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [selectedexportForm, setSelectedExportForm] = useState<TExports | null>(
    null,
  );
  const { data: warehouses } = useGetAllListOfWarehouse();
  const [modalType, setModalType] = useState<TExportModal>('add');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: TExportModal) => {
    setModalType(type);
  };

  const {
    filter,
    debouncedFilter,
    setFilter,
    pagination,
    onPaginationChange,
    onChangeFilter,
  } = useFilter<TFilterExport>({
    defaultFilter: {
      headline: null,
      importWarehouse: null,
      exportWarehouse: null,
    },
  });

  const {
    data: exportForm,
    isLoading,
    mutate,
  } = useExportForm(pagination, debouncedFilter);

  const handleDeleteExportForm = async (id: string | null) => {
    try {
      const res = await exportFormApi.deleteExportForm(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('importWarehouse'),
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      name: 'importWarehouse',
      className: 'w-100',
      allowClear: true,
      value: filter.importWarehouse,
      onChange: (value: string | null) => {
        setFilter({
          ...filter,
          importWarehouse: value,
        });
      },
    },
    {
      label: t('exportWarehouse'),
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      name: 'exportWarehouse',
      className: 'w-100',
      allowClear: true,
      value: filter.exportWarehouse,
      onChange: (value: string) => {
        onChangeFilter('exportWarehouse', value);
      },
    },
    {
      label: t('Headline'),
      name: 'headline',
      key: 'headline',
      value: filter.headline,
      allowClear: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('headline', e.target.value),
    },
  ];

  const columns: ColumnsType = [
    {
      key: 'index',
      title: 'STT',
      width: 50,
      dataIndex: 'index',
      render(_, __, index) {
        return index + 1;
      },
    },
    {
      title: t('couponCode'),
      width: 200,
      dataIndex: 'couponCode',
    },
    {
      title: t('Headline'),
      dataIndex: 'headline',
      width: 200,
    },
    {
      title: t('importWarehouse'),
      dataIndex: 'importWarehouse',
      width: 200,
      render: (value: string) => {
        const warehouse = warehouses?.data?.find(
          warehouse => String(warehouse.id) === String(value),
        );
        return warehouse ? warehouse.tenKho : null;
      },
    },
    {
      title: t('exportWarehouse'),
      dataIndex: 'exportWarehouse',
      width: 200,
      render: (value: string) => {
        const warehouse = warehouses?.data?.find(
          warehouse => String(warehouse.id) === String(value),
        );
        return warehouse ? warehouse.tenKho : null;
      },
    },
    {
      title: t('invoiceNumber'),
      width: 200,
      dataIndex: 'invoiceNumber',
    },
    {
      title: t('fromDate'),
      width: 200,
      dataIndex: 'fromDate',
    },
    {
      title: t('toDate'),
      dataIndex: 'toDate',
      width: 200,
    },
    {
      title: t('totalMoney'),
      width: 200,
      dataIndex: 'totalMoney',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record: TExports) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              onClick={() => {
                setSelectedExportForm(record), onOpenModal();
                onChangeModalType('edit');
                mutate();
              }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeleteExportForm(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                style={{ color: token['red-7'] }}
                icon={<DeleteOutlined />}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8 }}
              gutter={[0, 6]}
            ></InputFields>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              columnGap: '8px',
            }}
          >
            <Button icon={<ReloadOutlined />}>{t('Delete_Search')}</Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </div>
        </Card>

        <TableCustom
          title={t('List_of_import')}
          columns={columns}
          extra={
            <>
              <ButtonCustom.Edit
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalType('add');
                  onOpenModal();
                  mutate();
                }}
              >
                {t('Add')}
              </ButtonCustom.Edit>
            </>
          }
          //data={[PHIEU_NHAP]}
          data={exportForm?.data?.content || []}
          pagination={{
            pageSize: exportForm?.data?.pageSize,
            pageNum: exportForm?.data?.pageNum,
            totalElements: exportForm?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={true}
          scroll={{ y: 300 }}
        ></TableCustom>
      </Space>
      <ExportModal
        key={selectedexportForm?.id}
        modalType={modalType}
        show={isOpenModal}
        exportForm={selectedexportForm}
        onHide={onCloseModal}
        onSuccess={() => {
          onOpenModal();
          mutate();
        }}
      ></ExportModal>
    </>
  );
};

export default Export;
