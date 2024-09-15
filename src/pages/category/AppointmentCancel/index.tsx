import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import {
  AppointmentCancelModalType,
  TAppointmentCancel,
  TFilterAppointmentCancel,
} from 'src/constants/types/category/appointmentCancel';
import appointmentCancelApi, {
  useAppointmentCancel,
} from 'src/helpers/api/category/appointmentCancelApi';
import useFilter from 'src/hooks/useFilter';
import { categoryICDGroups } from 'src/routes/routes.contants';

import ChapterModal from './AppointmentCancelModal';

const AppointmentCancel = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<AppointmentCancelModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TAppointmentCancel | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterAppointmentCancel>({
    defaultFilter: {
      appAppointmentCancelReasonCode: '',
      name: '',
    },
  });
  const { data, isLoading, mutate } = useAppointmentCancel(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: AppointmentCancelModalType) => {
    setModalType(type);
  };
  const handleDelete = async (appAppointmentCancelReasonCode: string) => {
    try {
      const res = await appointmentCancelApi.deleteAppointmentCancel(
        appAppointmentCancelReasonCode,
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
      label: t('Reason_record'),
      type: TYPE_FIELD.TEXT,
      name: 'appAppointmentCancelReasonCode',
      className: 'w-100',
      allowClear: true,
      value: filter.appAppointmentCancelReasonCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('appAppointmentCancelReasonCode', e.target.value),
    },
    {
      label: t('Name'),
      type: TYPE_FIELD.TEXT,
      name: 'name',
      className: 'w-100',
      allowClear: true,
      value: filter.name,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('name', e.target.value),
    },
  ];

  const columns: ColumnsType<TAppointmentCancel> = [
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
      title: t('Reason_record'),
      dataIndex: 'appAppointmentCancelReasonCode',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TAppointmentCancel) => {
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
              onConfirm={() =>
                handleDelete(record.appAppointmentCancelReasonCode)
              }
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
              span={{ sm: 24, lg: 8, xl: 12 }} // change thanh search cho đều nhau
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
          title={t('A_reference_of_reasons_for_appointment_cancel')}
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

export default AppointmentCancel;
