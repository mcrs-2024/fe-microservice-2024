import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
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
import dayjs from 'dayjs';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { STATUS } from 'src/constants/dumb/couponForm';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { TWarehouseLocation } from 'src/constants/types/category/warehouseLocation';
import {
  TSupplierCategory,
  TWarehouseMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import {
  TCoupon,
  TCouponModal,
  TFilterCoupon,
} from 'src/constants/types/registration/phieuNhap';
import { useGetAllSupplier } from 'src/helpers/api/medicineStore/medicineStoreCategory/supplierCategory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import couponApi, { useCoupon } from 'src/helpers/api/medicineStore/phieuNhap';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';

import CouponModal from './CouponModal/CouponModal';

const PhieuNhap = () => {
  const { t } = useTranslation();
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { data: suppliers } = useGetAllSupplier();
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const [selectedCoupon, setSelectedCoupon] = useState<TCoupon | null>(null);
  const [modalType, setModalType] = useState<TCouponModal>('add');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  const onChangeModalType = (type: TCouponModal) => {
    setModalType(type);
  };

  const { filter, pagination, onPaginationChange, onChangeFilter } =
    useFilter<TFilterCoupon>({
      defaultFilter: {
        suppliers: null,
        headline: null,
        couponCode: null,
        importWarehouse: null,
        invoiceNumber: null,
      },
    });

  const { data: phieuNhap, isLoading, mutate } = useCoupon(pagination, filter);

  const handleDeletePhieuNhap = async (id: string | null) => {
    try {
      const res = await couponApi.deleteCoupon(id);
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
      label: t('Headline'),
      name: 'headline',
      key: 'headline',
      value: filter.headline,
      allowClear: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('headline', e.target.value);
      },
    },
    {
      label: t('Supplier'),
      name: 'suppliers',
      key: 'suppliers',
      value: filter.suppliers,
      type: TYPE_FIELD.SELECT,
      options: suppliers?.data?.map((supplier: TSupplierCategory) => ({
        value: supplier.id ?? null,
        label: supplier.nccName ?? null,
      })),
      onChange: (value: string) => {
        onChangeFilter('suppliers', value);
      },
    },
    {
      label: t('Coupon code'),
      name: 'couponCode',
      key: 'couponCode',
      value: filter.couponCode,
      allowClear: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('couponCode', e.target.value);
      },
    },
    {
      label: t('invoiceNumber'),
      name: 'invoiceNumber',
      key: 'invoiceNumber',
      value: filter.invoiceNumber,
      allowClear: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('invoiceNumber', e.target.value);
      },
    },
    {
      label: t('Warehouse'),
      name: 'importWarehouse',
      key: 'importWarehouse',
      value: filter.importWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? null,
          label: warehouse.tenKho ?? null,
        }),
      ),
      onChange: (value: string) => {
        onChangeFilter('importWarehouse', value);
      },
    },
  ];

  const columns: ColumnsType<TCoupon> = [
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
      width: 100,
    },
    {
      title: t('Headline'),
      dataIndex: 'headline',
      width: 100,
    },
    {
      title: t('Warehouse'),
      dataIndex: 'importWarehouse',
      width: 100,
      render: (value: string) => {
        const warehouse = warehouses?.data?.find(
          warehouse => String(warehouse.id) === String(value),
        );
        return warehouse ? warehouse.tenKho : null;
      },
    },
    {
      title: t('Supplier'),
      dataIndex: 'suppliers',
      width: 100,
      render: () => {
        return suppliers?.data?.map((supplier: TSupplierCategory) => {
          const values = supplier.nccName;
          return values;
        });
      },
    },
    { title: t('Order_Code'), dataIndex: 'invoiceNumber', width: 100 },
    {
      title: t('Date_of_import'),
      dataIndex: 'fromDate',
      width: 100,
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t('Date_of_export'),
      dataIndex: 'toDate',
      width: 100,
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    { title: t('Total_Amount'), dataIndex: 'totalMoney', width: 100 },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      render: (value: string) => {
        const status = STATUS?.find(
          status => String(status.value) === String(value),
        );
        return status ? status.label : null;
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record: TCoupon) => {
        return (
          <Flex justify='center'>
            {/* <Button size='small' icon={<EyeOutlined />} type='link'></Button> */}
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              onClick={() => {
                setSelectedCoupon(record), onOpenModal();
                onChangeModalType('edit');
              }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeletePhieuNhap(record.id)}
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

  useEffect(() => {
    dispatch(
      addButton({
        action: PERMISSION_CODES.CREATE,
        id: 'addButtonCoupon',
        className: 'btn-sub',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () => {
          onChangeModalType('add');
          onOpenModal();
        },
        children: 'Add',
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8, xl: 8 }}
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
          data={phieuNhap?.data?.content || []}
          pagination={{
            pageSize: phieuNhap?.data?.pageSize,
            pageNum: phieuNhap?.data?.pageNum,
            totalElements: phieuNhap?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={true}
          scroll={{ x: 800, y: 800 }}
        ></TableCustom>
      </Space>
      <CouponModal
        key={selectedCoupon?.id}
        modalType={modalType}
        show={isOpenModal}
        coupon={selectedCoupon}
        onHide={onCloseModal}
        onSuccess={() => {
          onOpenModal();
          mutate();
        }}
      ></CouponModal>
    </>
  );
};

export default PhieuNhap;
