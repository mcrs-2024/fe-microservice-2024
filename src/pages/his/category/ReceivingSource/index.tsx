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
  ReceivingSourceModalType,
  TReceivingSource,
} from 'src/constants/types/his/category/recievingSource';
import receivingSourceApi, {
  useReceivingSource,
} from 'src/helpers/api/his/category/receivingSource';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryReceivingSource } from 'src/routes/routes.contants';

import ReceivingSourceModal from './ReceivingSourceModal/receivingSourceModal';

const ReceivingSource = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ReceivingSourceModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TReceivingSource | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TReceivingSource>({
    defaultFilter: {
      code: '',
      name: '',
    },
  });

  const { data, isLoading, mutate } = useReceivingSource(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ReceivingSourceModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await receivingSourceApi.deleteReceivingSourceModal(id);
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
      label: t('Receiving_Source_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'recievingSourceCode',
      className: 'w-100',
      allowClear: true,
      value: filter.recievingSourceCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('recievingSourceCode', e.target.value),
    },
    {
      label: t('Receiving_Source_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'recievingSourceName',
      className: 'w-100',
      allowClear: true,
      value: filter.recievingSourceName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('recievingSourceName', e.target.value),
    },
  ];

  const columns: ColumnsType<TReceivingSource> = [
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
      title: t('Receiving_source_code'),
      dataIndex: 'recievingSourceCode',
      width: 200,
    },
    {
      title: t('Receiving_source_name'),
      dataIndex: 'recievingSourceName',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TReceivingSource) => {
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
          { label: t('category'), path: categoryReceivingSource },
          {
            label: t('Receiving_source'),
            path: categoryReceivingSource,
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
          title={t('Receiving_source')}
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
                {t('Add_Receiving_Source_Category')}
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
      <ReceivingSourceModal
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

export default ReceivingSource;
