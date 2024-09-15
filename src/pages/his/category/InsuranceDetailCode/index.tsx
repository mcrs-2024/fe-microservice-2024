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
  InsuranceDetailCodeModalType,
  TInsuranceDetailCode,
} from 'src/constants/types/his/category/insuranceDetailCode';
import insuranceDetailCodeApi, {
  useInsuranceDetailCode,
} from 'src/helpers/api/his/category/insuranceDetailCode';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryInsuranceDetailCode } from 'src/routes/routes.contants';

import InsuranceDetailCodeModal from './InsuranceDetailCodeModal';

const InsuranceDetail = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] =
    useState<InsuranceDetailCodeModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TInsuranceDetailCode | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TInsuranceDetailCode>({
    defaultFilter: {
      insuranceEntityDetailCode: '',
      insuranceEntityDetailName: '',
    },
  });

  const { data, isLoading, mutate } = useInsuranceDetailCode(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: InsuranceDetailCodeModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await insuranceDetailCodeApi.deleteInsuranceDetailCode(id);
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
      label: t('Insurance_Detail_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'insuranceEntityDetailCode',
      className: 'w-100',
      allowClear: true,
      value: filter.insuranceEntityDetailCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('insuranceEntityDetailCode', e.target.value),
    },
    {
      label: t('Insurance_Detail_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'insuranceEntityDetailName',
      className: 'w-100',
      allowClear: true,
      value: filter.insuranceEntityDetailName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('insuranceEntityDetailName', e.target.value),
    },
  ];

  const columns: ColumnsType<TInsuranceDetailCode> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Insurance_Detail_Code'),
      dataIndex: 'insuranceEntityDetailCode',
      width: 200,
    },
    {
      title: t('Insurance_Detail_Name'),
      dataIndex: 'insuranceEntityDetailName',
      width: 200,
    },
    {
      title: t('Insurance_Detail_Percentage'),
      dataIndex: 'percentageOfCoPayment',
      width: 200,
    },
    {
      title: t('Insurance_Detail_Payer_Unit'),
      dataIndex: 'paymentUnit',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TInsuranceDetailCode) => {
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
      <PageTitle
        breadCrumbItems={[
          { label: t('category'), path: categoryInsuranceDetailCode },
          {
            label: t('Insurance_Detail'),
            path: categoryInsuranceDetailCode,
            active: true,
          },
        ]}
      />
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
          title={t('Insurance_Detail')}
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
                {t('Add_Insurance_Detail_Category')}
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
      <InsuranceDetailCodeModal
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

export default InsuranceDetail;
