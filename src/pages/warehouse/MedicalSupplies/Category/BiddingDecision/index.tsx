import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  BiddingDecisionModalType,
  TBiddingDecision,
} from 'src/constants/types/categoryWarehouseSupplier/biddingDecision';
import biddingDecisionApi, {
  useBiddingDecision,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/biddingDecision';
import useFilter from 'src/hooks/useFilter';

import BiddingDecisionModal from './BiddingDecisionModal/BiddingDecisionModal';

const BiddingDecision = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: biddingDecision,
    isLoading,
    mutate,
  } = useBiddingDecision(pagination);
  const [selectedBiddingDecision, setselectedBiddingDecision] =
    useState<TBiddingDecision | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<BiddingDecisionModalType>('add');
  const onChangeModalType = (type: BiddingDecisionModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await biddingDecisionApi.deleteBiddingDecision(id);
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

  const column: ColumnsType<TBiddingDecision> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('tenVatTu'),
      dataIndex: 'tenVatTu',
      width: 300,
    },
    {
      title: t('tenDonVi'),
      dataIndex: 'tenDonVi',
      width: 350,
    },
    {
      title: t('soThau'),
      dataIndex: 'soThau',
      width: 350,
    },
    {
      title: t('quyetDinh'),
      dataIndex: 'quyetDinh',
      width: 350,
    },
    {
      title: t('ngayCongBo'),
      dataIndex: 'ngayCongBo',
      width: 350,
    },
    {
      title: t('note'),
      dataIndex: 'note',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TBiddingDecision) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedBiddingDecision(record);
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
          title={t('BiddingDecision')}
          columns={column}
          data={biddingDecision?.data?.content || []}
          pagination={{
            pageNum: biddingDecision?.data?.pageNum,
            pageSize: biddingDecision?.data?.pageSize,
            totalElements: biddingDecision?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <BiddingDecisionModal
        key={selectedBiddingDecision?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedBiddingDecision}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></BiddingDecisionModal>
    </>
  );
};

export default BiddingDecision;
