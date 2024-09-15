import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  FirmModalType,
  TFirm,
} from 'src/constants/types/categoryWarehouseSupplier/firm';
import firmApi, {
  useFirm,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/firm';
import useFilter from 'src/hooks/useFilter';

import FirmModal from './FirmCategoryModal/FirmCategoryModal';

const Firm = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const { data: firm, isLoading, mutate } = useFirm(pagination);
  const [selectedFirm, setselectedFirm] = useState<TFirm | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<FirmModalType>('add');
  const onChangeModalType = (type: FirmModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await firmApi.deleteFirm(id);
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

  const column: ColumnsType<TFirm> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('maSoSp'),
      dataIndex: 'maSoSp',
      width: 300,
    },
    {
      title: t('tenSanPham'),
      dataIndex: 'tenSanPham',
      width: 350,
    },
    {
      title: t('ghiChu'),
      dataIndex: 'ghiChu',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TFirm) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedFirm(record);
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
          title={t('Firm')}
          columns={column}
          data={firm?.data?.content || []}
          pagination={{
            pageNum: firm?.data?.pageNum,
            pageSize: firm?.data?.pageSize,
            totalElements: firm?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <FirmModal
        key={selectedFirm?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedFirm}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></FirmModal>
    </>
  );
};

export default Firm;
