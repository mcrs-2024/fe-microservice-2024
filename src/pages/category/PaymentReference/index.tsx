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
  Tag,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { PAYMENT_TYPE_OPTIONS } from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  PaymentReferenceModalType,
  TFilterPaymentReference,
  TPaymentReference,
} from 'src/constants/types/category/paymentReference';
import paymentReferenceApi, {
  usePaymentReference,
} from 'src/helpers/api/category/paymentReferenceApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICDGroups } from 'src/routes/routes.contants';

import ChapterModal from './PaymentReferenceModal';

const PaymentReference = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PaymentReferenceModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TPaymentReference | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPaymentReference>({
    defaultFilter: {
      arPaymentSubTypeCode: '',
      arPaymentSubTypeRefName: '',
    },
  });
  const { data, isLoading, mutate } = usePaymentReference(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PaymentReferenceModalType) => {
    setModalType(type);
  };
  const handleDelete = async (arPaymentSubTypeCode: string) => {
    try {
      const res =
        await paymentReferenceApi.deletePaymentReference(arPaymentSubTypeCode);
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
      label: t('Payment_code'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentSubTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentSubTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentSubTypeCode', e.target.value),
    },
    {
      label: t('Payment_name'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentSubTypeRefName',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentSubTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentSubTypeRefName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPaymentReference> = [
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
      title: t('Payment_code'),
      dataIndex: 'arPaymentSubTypeCode',
    },
    {
      title: t('Payment_name'),
      dataIndex: 'arPaymentSubTypeRefName',
    },
    {
      title: t('Type_Code'),
      dataIndex: 'arPaymentTypeCode',
      render: (value: number) => {
        const payment = PAYMENT_TYPE_OPTIONS.find(
          payment => Number(payment.value) === Number(value),
        );
        return payment ? payment.label : '';
      },
    },
    {
      title: t('Description'),
      dataIndex: 'description',
    },
    {
      title: t('Currency_unit'),
      dataIndex: 'currencyRcd',
      render: (value: number) => {
        const payment = PAYMENT_TYPE_OPTIONS.find(
          payment => Number(payment.value) === Number(value),
        );
        return payment ? payment.label : '';
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPaymentReference) => {
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
              onConfirm={() => handleDelete(record.arPaymentSubTypeCode)}
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
              span={{ sm: 24, lg: 8, xl: 12 }}
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
          title={t('Payment_reference')}
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
      <ChapterModal
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

export default PaymentReference;
