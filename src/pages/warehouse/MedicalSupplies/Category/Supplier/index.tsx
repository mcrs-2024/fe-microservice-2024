import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  SupplierModalType,
  TSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/supplier';
import supplierApi, {
  useSupplier,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/supplier';
import useFilter from 'src/hooks/useFilter';

import SupplierModal from './SupplierModal/SupplierModal';

const Supplier = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const { data: suppliers, isLoading, mutate } = useSupplier(pagination);
  const [selectedSupplier, setselectedSupplier] = useState<TSupplier | null>(
    null,
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<SupplierModalType>('add');
  const onChangeModalType = (type: SupplierModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await supplierApi.deleteSupplier(id);
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

  const column: ColumnsType<TSupplier> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      width: 300,
    },
    {
      title: t('address'),
      dataIndex: 'address',
      width: 350,
    },
    {
      title: t('representative'),
      dataIndex: 'representative',
      width: 350,
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      width: 350,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      width: 350,
    },
    {
      title: t('description'),
      dataIndex: 'description',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TSupplier) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedSupplier(record);
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
          title={t('Supplier')}
          columns={column}
          data={suppliers?.data?.content || []}
          pagination={{
            pageNum: suppliers?.data?.pageNum,
            pageSize: suppliers?.data?.pageSize,
            totalElements: suppliers?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <SupplierModal
        key={selectedSupplier?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedSupplier}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></SupplierModal>
    </>
  );
};

export default Supplier;
