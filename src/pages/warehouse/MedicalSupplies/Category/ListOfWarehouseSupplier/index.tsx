import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  ListOfWarehouseSupplierModal,
  TListOfWarehouseSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/listOfWarehouseSuppliers';
import listOfWarehouseCategoryApi, {
  useListOfWarehouseCategory,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import useFilter from 'src/hooks/useFilter';

import ListOfWarehouseSupllierModal from './ListOfWarehouseSupplierModal/ListOfWarehouseSupplierModal';

const ListOfWarehouseSupplier = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: listOfWarehouseSupplier,
    isLoading,
    mutate,
  } = useListOfWarehouseCategory(pagination);
  const [selectedWarehouseSupplier, setselectedWarehouseSupplier] =
    useState<TListOfWarehouseSupplier | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] =
    useState<ListOfWarehouseSupplierModal>('add');
  const onChangeModalType = (type: ListOfWarehouseSupplierModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res =
        await listOfWarehouseCategoryApi.deleteListOfWarehouseCategory(id);
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

  const column: ColumnsType<TListOfWarehouseSupplier> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('tenKho'),
      dataIndex: 'tenKho',
      width: 300,
    },
    {
      title: t('moTa'),
      dataIndex: 'moTa',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TListOfWarehouseSupplier) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedWarehouseSupplier(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.View>
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
                {t('Add')}
              </ButtonCustom.Create>
            </>
          }
          title={t('ListOfWarehouseSupplier')}
          columns={column}
          data={listOfWarehouseSupplier?.data?.content || []}
          pagination={{
            pageNum: listOfWarehouseSupplier?.data?.pageNum,
            pageSize: listOfWarehouseSupplier?.data?.pageSize,
            totalElements: listOfWarehouseSupplier?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <ListOfWarehouseSupllierModal
        key={selectedWarehouseSupplier?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedWarehouseSupplier}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></ListOfWarehouseSupllierModal>
    </>
  );
};

export default ListOfWarehouseSupplier;
