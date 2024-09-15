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
  PaymentGroupsModalType,
  TFilterPaymentGroups,
  TPaymentGroups,
} from 'src/constants/types/category/paymentGroups';
import paymentGroupApi, {
  usePaymentGroup,
} from 'src/helpers/api/category/paymentGroup';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryPaymentGroups } from 'src/routes/routes.contants';

import PaymentGroupModal from './PaymentGroupModal/PaymentGroupModal';

const PaymentGroups = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PaymentGroupsModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TPaymentGroups | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPaymentGroups>({
    defaultFilter: {
      arPaymentTypeGroupCode: '',
      arPaymentTypeGroupRefName: '',
    },
  });
  const { data, isLoading, mutate } = usePaymentGroup(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PaymentGroupsModalType) => {
    setModalType(type);
  };
  const handleDelete = async (arPaymentTypeGroupCode: string) => {
    try {
      const res = await paymentGroupApi.deletePaymentGroup(
        arPaymentTypeGroupCode,
      );
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
      label: t('Group_code'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentTypeGroupCode',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentTypeGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentTypeGroupCode', e.target.value),
    },
    {
      label: t('Group_name'),
      type: TYPE_FIELD.TEXT,
      name: 'arPaymentTypeGroupRefName',
      className: 'w-100',
      allowClear: true,
      value: filter.arPaymentTypeGroupRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('arPaymentTypeGroupRefName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPaymentGroups> = [
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
      title: t('Group_code'),
      dataIndex: 'arPaymentTypeGroupCode',
    },
    {
      title: t('Group_name'),
      dataIndex: 'arPaymentTypeGroupRefName',
    },
    {
      title: t('description'),
      dataIndex: 'description',
    },
    {
      title: t('requiresSubTypeFlag'),
      dataIndex: 'requiresSubTypeFlag',
      render: (value: boolean) => {
        return value ? 'Yes' : 'No';
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPaymentGroups) => {
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
              onConfirm={() => handleDelete(record.arPaymentTypeGroupCode)}
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
              span={{ sm: 24, lg: 12 }}
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
          title={t('Paymentgroup_category')}
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
      <PaymentGroupModal
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

export default PaymentGroups;
