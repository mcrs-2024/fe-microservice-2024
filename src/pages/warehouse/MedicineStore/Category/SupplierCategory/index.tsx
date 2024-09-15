import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  TSupplierCategory,
  TSupplierCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import supplierCategoryApi, {
  useSupplierCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/supplierCategory';
import useFilter from 'src/hooks/useFilter';

import SupplierCategoryModal from './SupplierCategoryModal';

const SupplierCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();

  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: SupplierCategory,
    isLoading,
    mutate,
  } = useSupplierCategory(pagination);
  const [selectedSupplier, setSelectedSupplier] =
    useState<TSupplierCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<TSupplierCategoryModal>('add');
  const onChangeModalType = (type: TSupplierCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: number | null) => {
    try {
      const res = await supplierCategoryApi.deleteSupplier(id);
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

  const column: ColumnsType<TSupplierCategory> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: t('Supplier ID'),
      dataIndex: 'nccId',
      width: 150,
    },
    {
      title: t('Address'),
      dataIndex: 'diaChi',
      width: 150,
    },
    {
      title: t('Contact'),
      dataIndex: 'lienHe',
      width: 150,
    },
    {
      title: t('Note'),
      dataIndex: 'ghiChu',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TSupplierCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedSupplier(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
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
        <TableCustom
          extra={
            <>
              <ButtonCustom.Create
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  onChangeModalType('add');
                  onOpenModal();
                }}
              >
                {t('Add new supplier')}
              </ButtonCustom.Create>
            </>
          }
          title={t('List of suppliers')}
          columns={column}
          //data={DANH_SACH_NCC}
          data={SupplierCategory?.data?.content || []}
          pagination={{
            pageSize: SupplierCategory?.data?.pageSize,
            pageNum: SupplierCategory?.data?.pageNum,
            totalElements: SupplierCategory?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={false}
          isRowSelection={false}
          showVisibleColumns={false}
          bordered
        ></TableCustom>
      </Space>
      <SupplierCategoryModal
        key={selectedSupplier?.id}
        modalType={modalType}
        show={isOpenModal}
        SupplierCategory={selectedSupplier}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></SupplierCategoryModal>
    </>
  );
};

export default SupplierCategory;
