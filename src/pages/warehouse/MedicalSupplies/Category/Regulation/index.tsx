import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  RegulationModalType,
  TRegulation,
} from 'src/constants/types/categoryWarehouseSupplier/regulations';
import regulationApi, {
  useRegulation,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/regulations';
import useFilter from 'src/hooks/useFilter';

import RegulationModal from './RegulationModal/RegulationModal';

const Regulation = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const { data: regulation, isLoading, mutate } = useRegulation(pagination);
  const [selectedRegulation, setselectedRegulation] =
    useState<TRegulation | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<RegulationModalType>('add');
  const onChangeModalType = (type: RegulationModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await regulationApi.deleteRegulation(id);
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

  const column: ColumnsType<TRegulation> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('NameRegulation'),
      dataIndex: 'name',
      width: 300,
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
      render: (_, record: TRegulation) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedRegulation(record);
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
          title={t('Regulation')}
          columns={column}
          data={regulation?.data?.content || []}
          pagination={{
            pageNum: regulation?.data?.pageNum,
            pageSize: regulation?.data?.pageSize,
            totalElements: regulation?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <RegulationModal
        key={selectedRegulation?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedRegulation}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></RegulationModal>
    </>
  );
};

export default Regulation;
