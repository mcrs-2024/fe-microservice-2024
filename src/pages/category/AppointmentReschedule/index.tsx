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
import {
  AppointmentRescheduleModalType,
  TAppointmentReschedule,
  TFilterAppointmentReschedule,
} from 'src/constants/types/category/appointmentReschedule';
import appointmentRescheduleApi, {
  useAppointmentReschedule,
} from 'src/helpers/api/category/appointmentRescheduleApi';
import useFilter from 'src/hooks/useFilter';
import { categoryAppointmentReschedule } from 'src/routes/routes.contants';

import AppointmentRescheduleModal from './AppointmentRescheduleModal/AppointmentRescheduleModal';

const AppointmentReschedule = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] =
    useState<AppointmentRescheduleModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TAppointmentReschedule | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterAppointmentReschedule>({
    defaultFilter: {
      appAppointmentRescheduleReasonCode: '',
    },
  });
  const { data, isLoading, mutate } = useAppointmentReschedule(
    pagination,
    debouncedFilter,
  );
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: AppointmentRescheduleModalType) => {
    setModalType(type);
  };
  const handleDelete = async (appAppointmentRescheduleReasonCode: string) => {
    try {
      const res = await appointmentRescheduleApi.deleteAppointmentReschedule(
        appAppointmentRescheduleReasonCode,
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
      label: t('appointmentRescheduleReason'),
      type: TYPE_FIELD.TEXT,
      name: 'appAppointmentRescheduleReasonCode',
      className: 'w-150',
      allowClear: true,
      value: filter.appAppointmentRescheduleReasonCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('appAppointmentRescheduleReasonCode', e.target.value),
    },
  ];

  const columns: ColumnsType<TAppointmentReschedule> = [
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
      title: t('appAppointmentRescheduleReasonCode'),
      dataIndex: 'appAppointmentRescheduleReasonCode',
    },
    {
      title: t('appointmentRescheduleReason'),
      dataIndex: 'name',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TAppointmentReschedule) => {
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
                handleDelete(record.appAppointmentRescheduleReasonCode)
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
              //   span={{ sm: 24, lg: 8 }}
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
          title={t('Appointment reschedule category')}
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
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>
      {/* edit modal */}
      <AppointmentRescheduleModal
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

export default AppointmentReschedule;
