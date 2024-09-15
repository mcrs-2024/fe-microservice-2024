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
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  ServiceConfigurationStatusModalType,
  TFilterServiceConfigurationStatus,
  TServiceConfigurationStatus,
} from 'src/constants/types/category/serviceConfigurationStatus';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryserviceConfigurationStatus } from 'src/routes/routes.contants';

import ServiceConfigurationStatusModal from './ServiceConfigurationStatusModal/ServiceConfigurationStatusModal';

const ServiceConfigurationStatusName = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] =
    useState<ServiceConfigurationStatusModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TServiceConfigurationStatus | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterServiceConfigurationStatus>({
    defaultFilter: {
      icdTypeCode: '',
      icdChapterNameV: '',
    },
  });
  // const { data, isLoading, mutate } = useChapter(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ServiceConfigurationStatusModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await chapterApi.deleteChapter(id);
      if (res.data.code) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      // mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('ServiceConfigurationStatusName'),
      type: TYPE_FIELD.TEXT,
      name: 'maChuong',
      className: 'w-100',
      allowClear: true,
      value: filter.icdTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdTypeCode', e.target.value),
    },
    {
      label: t('Detail_description'),
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
  ];

  const columns: ColumnsType<TServiceConfigurationStatus> = [
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
      title: t('ServiceConfigurationStatusName'),
      dataIndex: 'maChuong',
    },
    {
      title: t('Detail_description'),
      dataIndex: 'tenChuong',
    },
    {
      title: t('Reminder'),
      dataIndex: 'hoatDong',
    },
    {
      title: t('Health Insurance faculty'),
      dataIndex: 'hoatDong',
    },
    {
      title: t('Price code'),
      dataIndex: 'hoatDong',
    },
    {
      title: t('Price_Status_Name'),
      dataIndex: 'hoatDong',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TServiceConfigurationStatus) => {
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
                // mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Service_Configuration_Status_Name_category')}
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
          data={[]}
          isLoading={false}
          // data={data?.data?.content || []}
          // isLoading={isLoading}
          // id='id'
          // pagination={{
          //   pageSize: data?.data?.pageSize,
          //   pageNum: data?.data?.pageNum,
          //   totalElements: data?.data?.totalElements,
          //   onChange: onPaginationChange,
          // }}
        />
      </Space>
      {/* edit modal */}
      <ServiceConfigurationStatusModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          // mutate();
        }}
      />
    </>
  );
};

export default ServiceConfigurationStatusName;
