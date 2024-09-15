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
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  PaymentTypeModalType,
  TFilterPaymentType,
  TPaymentType,
} from 'src/constants/types/category/paymentType';
import paymentApi, {
  useGetAllCurrency,
  useGetAllGroupPayment,
  usePaymentType,
} from 'src/helpers/api/category/paymentType';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryPaymentType } from 'src/routes/routes.contants';

import PaymentTypeModal from './PaymentTypeModal/PaymentTypeModal';

const PaymentType = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { data: currencies } = useGetAllCurrency();
  const { data: groupPayments } = useGetAllGroupPayment();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PaymentTypeModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TPaymentType | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPaymentType>({
    defaultFilter: {
      arPaymentTypeCode: null,
      arPaymentTypeGroupCode: null,
      arPaymentTypeRefName: null,
    },
  });
  const { data, isLoading, mutate } = usePaymentType(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PaymentTypeModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await paymentApi.deletePaymentType(id);
      if (res.data.code) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('Type_code'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentTypeCode', e.target.value),
    },
    {
      label: t('Type_name'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentTypeRefName',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentTypeRefName', e.target.value),
    },
    {
      label: t('Payment_group_code'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentTypeGroupCode',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentTypeGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentTypeGroupCode', e.target.value),
    },
  ];

  const columns: ColumnsType<TPaymentType> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Type_code'),
      dataIndex: 'arPaymentTypeCode',
    },
    {
      title: t('Type_name'),
      dataIndex: 'arPaymentTypeRefName',
    },
    {
      title: t('Payment_group_code'),
      dataIndex: 'arPaymentTypeGroupCode',
      render: (value: string) => {
        const data = groupPayments?.data?.find(
          (gpy: { arPaymentTypeGroupCode: any }) =>
            String(gpy.arPaymentTypeGroupCode) === String(value),
        );
        return data ? data.arPaymentTypeGroupRefName : null;
      },
    },
    {
      title: t('description'),
      dataIndex: 'description',
    },
    {
      title: t('Currency_unit'),
      dataIndex: 'currency',
      render: (value: string) => {
        const data = currencies?.data?.find(
          (curr: { id: any }) => String(curr.id) === String(value),
        );
        return data ? data.currencyName : null;
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPaymentType) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedRecord(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            />
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDelete(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      {/* header */}
      <Space direction='vertical' className='d-flex'>
        {/* filter container */}
        <Card>
          {/* filter inputs */}
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          {/* filter actions */}
          <Row
            justify={'end'}
            className='d-flex align-items-center'
            style={{
              columnGap: '8px',
            }}
          >
            {/* reset filter */}
            <Button icon={<ReloadOutlined />} onClick={onResetFilter}>
              {t('Delete_Search')}
            </Button>
            {/* trigger filter */}
            <Button
              type='primary'
              icon={<SearchOutlined />}
              onClick={() => {
                mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Payment_Type_category')}
          extra={
            <>
              <ButtonCustom.Create
                type='primary'
                onClick={() => {
                  onChangeModalType('add');
                  onOpenModal();
                }}
                icon={<PlusOutlined />}
              >
                {t('Add')}
              </ButtonCustom.Create>
            </>
          }
          data={data?.data?.content || []}
          isLoading={isLoading}
          id='id'
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>
      {/* edit modal */}
      <PaymentTypeModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default PaymentType;
