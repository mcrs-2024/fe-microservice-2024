import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, message, Popconfirm, Row, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TFilterWarehouseMedicineCategory,
  TWarehouseMedicineCategory,
  TWarehouseMedicineCategoryModel,
} from 'src/constants/types/medicineStore/medicineCategory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import warehouseMedicineCategoryApi, {
  useWarehouseMedicineCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import useFilter from 'src/hooks/useFilter';

import WarehouseMedicineCategoryModal from './WarehouseMedicineCategoryModal';

const WarehouseMedicineCategory = () => {
  const { t } = useTranslation();
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { token } = theme.useToken();

  const { filter, debouncedFilter, setFilter, pagination, onPaginationChange } =
    useFilter<TFilterWarehouseMedicineCategory>({
      defaultFilter: { tenKho: null },
    });
  const {
    data: warehouseMedicines,
    isLoading,
    mutate,
  } = useWarehouseMedicineCategory(pagination, debouncedFilter);
  const [
    selectedWarehouseMedicineCategory,
    setSelectedWarehouseMedicineCategory,
  ] = useState<TWarehouseMedicineCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] =
    useState<TWarehouseMedicineCategoryModel>('add');
  const onChangeModalType = (type: TWarehouseMedicineCategoryModel) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res =
        await warehouseMedicineCategoryApi.deleteWarehouseMedicine(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('Repository management'),
      name: 'tenKho',
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      allowClear: true,
      value: filter.tenKho,
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          tenKho: newValue,
        });
      },
    },
  ];

  const column: ColumnsType<TWarehouseMedicineCategory> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 150,
      align: 'center',
    },
    {
      title: t('warehouseName'),
      dataIndex: 'tenKho',
      width: 500,
    },
    {
      title: t('description'),
      dataIndex: 'moTa',
      width: 500,
    },
    {
      title: t('action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      render: (_, record: TWarehouseMedicineCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedWarehouseMedicineCategory(record);
                onOpenModal();
                onChangeModalType('edit');
                mutate();
              }}
            ></ButtonCustom.Edit>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa danh mục kho dược này?'
              onConfirm={() => handleDelete(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                type='link'
                size='small'
                icon={<DeleteOutlined />}
                style={{ color: token['red-7'] }}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card title={t('Repository management configuration')}>
          <Row>
            <InputFields inputs={inputSearch}></InputFields>
          </Row>
        </Card>
        <TableCustom
          title={t('Pharmacy inventory list')}
          columns={column}
          data={warehouseMedicines?.data?.content || []}
          pagination={{
            pageNum: warehouseMedicines?.data?.pageNum,
            pageSize: warehouseMedicines?.data?.pageSize,
            totalElements: warehouseMedicines?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          showVisibleColumns={false}
          bordered
        ></TableCustom>
      </Space>
      <WarehouseMedicineCategoryModal
        key={selectedWarehouseMedicineCategory?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedWarehouseMedicineCategory}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></WarehouseMedicineCategoryModal>
    </>
  );
};

export default WarehouseMedicineCategory;
