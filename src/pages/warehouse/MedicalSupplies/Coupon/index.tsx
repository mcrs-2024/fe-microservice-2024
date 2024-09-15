import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { STATUS } from 'src/constants/dumb/couponForm';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TCouponForm,
  TCouponFormModal,
  TFilterCouponForm,
} from 'src/constants/types/categoryWarehouseSupplier/couponForm';
import { TListOfWarehouseSupplier } from 'src/constants/types/categoryWarehouseSupplier/listOfWarehouseSuppliers';
import couponFormApi, {
  useCouponForm,
} from 'src/helpers/api/warehouseSupplier/couponForm';
import { useGetAllListOfWarehouse } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import useFilter from 'src/hooks/useFilter';

import CouponModal from './CouponModal/CouponModal';

const CouponForm = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [selectedCouponForm, setSelectedCouponForm] =
    useState<TCouponForm | null>(null);
  const [modalType, setModalType] = useState<TCouponFormModal>('add');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data: warehouses } = useGetAllListOfWarehouse();
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  const onChangeModalType = (type: TCouponFormModal) => {
    setModalType(type);
  };

  const {
    filter,
    debouncedFilter,
    pagination,
    onPaginationChange,
    onChangeFilter,
  } = useFilter<TFilterCouponForm>({
    defaultFilter: {
      couponCode: null,
      exportWarehouse: null,
      fromDate: null,
      headline: null,
      importWarehouse: null,
      invoiceNumber: null,
      toDate: null,
      status: null,
    },
  });

  const {
    data: couponForm,
    isLoading,
    mutate,
  } = useCouponForm(pagination, debouncedFilter);

  const handleDeleteCouponForm = async (id: string | null) => {
    try {
      const res = await couponFormApi.deleteCouponForm(id);
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
      label: t('Coupon code'),
      name: 'couponCode',
      key: 'couponCode',
      value: filter.couponCode,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('couponCode', e.target.value);
      },
    },
    {
      label: t('Headline'),
      name: 'headline',
      key: 'headline',
      value: filter.headline,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('headline', e.target.value);
      },
    },
    {
      label: t('importWarehouse'),
      name: 'importWarehouse',
      key: 'importWarehouse',
      value: filter.importWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map((warehouse: TListOfWarehouseSupplier) => ({
        value: warehouse.id ?? null,
        label: warehouse.tenKho ?? null,
      })),
      onChange: (value: string) => {
        onChangeFilter('importWarehouse', value);
      },
    },
    {
      label: t('exportWarehouse'),
      name: 'exportWarehouse',
      key: 'exportWarehouse',
      value: filter.exportWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map((warehouse: TListOfWarehouseSupplier) => ({
        value: warehouse.id ?? null,
        label: warehouse.tenKho ?? null,
      })),
      onChange: (value: string) => {
        onChangeFilter('exportWarehouse', value);
      },
    },
    {
      label: t('invoiceNumber'),
      name: 'invoiceNumber',
      key: 'invoiceNumber',
      value: filter.invoiceNumber,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('invoiceNumber', e.target.value);
      },
    },
    {
      label: t('toDate'),
      name: 'toDate',
      key: 'toDate',
      value: filter.toDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        onChangeFilter('toDate', dateString);
      },
    },
    {
      label: t('fromDate'),
      name: 'fromDate',
      key: 'fromDate',
      value: filter.fromDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        onChangeFilter('fromDate', dateString);
      },
    },
    {
      label: t('status'),
      name: 'statusCouponForm',
      key: 'status',
      value: filter.status,
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      onChange: (value: string) => {
        onChangeFilter('status', value);
      },
    },
  ];

  const columns: ColumnsType<TCouponForm> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      align: 'center',
      width: 150,
      render: (_, __, index) => index + 1,
    },
    {
      title: t('Coupon_code'),
      dataIndex: 'couponCode',
      width: 200,
    },
    {
      title: t('Headline'),
      dataIndex: 'headline',
      width: 200,
    },
    {
      title: t('Warehouse'),
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
    { title: t('Order_Code'), dataIndex: 'invoiceNumber', width: 200 },
    { title: t('Date_of_import'), dataIndex: 'fromDate', width: 200 },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 200,
      render: (value: string) => {
        const status = STATUS.find(
          status => String(status.value) === String(value),
        );
        return status ? status.label : null;
      },
    },
    { title: t('Date_of_export'), dataIndex: 'toDate', width: 200 },
    { title: t('Total_Amount'), dataIndex: 'totalMoney', width: 200 },
    {
      title: t('Action'),
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record: TCouponForm) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              onClick={() => {
                setSelectedCouponForm(record), onOpenModal();
                onChangeModalType('edit');
                mutate();
              }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeleteCouponForm(record.id)}
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
              style={{ margin: '100px' }}
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
          data={couponForm?.data?.content || []}
          pagination={{
            pageSize: couponForm?.data?.pageSize,
            pageNum: couponForm?.data?.pageNum,
            totalElements: couponForm?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={true}
          scroll={{ x: 400, y: 400 }}
        ></TableCustom>
      </Space>
      <CouponModal
        key={selectedCouponForm?.id}
        modalType={modalType}
        show={isOpenModal}
        couponForm={selectedCouponForm}
        onHide={onCloseModal}
        onSuccess={() => {
          onOpenModal();
          mutate();
        }}
      ></CouponModal>
    </>
  );
};

export default CouponForm;
