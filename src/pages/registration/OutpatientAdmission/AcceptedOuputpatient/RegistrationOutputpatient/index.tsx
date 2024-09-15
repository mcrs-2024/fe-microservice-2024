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
import TableCustom from 'src/components/TableCustom';
import { STATUS } from 'src/constants/dumb/couponForm';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  OutpatientAdmissionModalType,
  TFilterOutpatientAdmission,
  TOutpatientAdmission,
} from 'src/constants/types/registration/outPatient';
import chapterApi from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';

import RegistrationOutputPatientModal from './RegistrationOutputpatientModal/RegistrationOutputpatientModal';

const RegistrationOutputPatient = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] =
    useState<OutpatientAdmissionModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TOutpatientAdmission | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterOutpatientAdmission>({
    defaultFilter: {
      patientName: null,
      fromDate: null,
      toDate: null,
      registrationId: null,
      status: null,
    },
  });
  // const { data, isLoading, mutate } = useChapter(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: OutpatientAdmissionModalType) => {
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
      label: t('fromDate'),
      type: TYPE_FIELD.DATE_PICKER,
      name: 'fromDate',
      className: 'w-100',
      allowClear: true,
      value: filter.fromDate,
      onChange: (_, dateString: string) =>
        onChangeFilter('fromDate', dateString),
    },
    {
      label: t('toDate'),
      type: TYPE_FIELD.DATE_PICKER,
      name: 'toDate',
      className: 'w-100',
      allowClear: true,
      value: filter.toDate,
      onChange: (_, dateString: string) => onChangeFilter('toDate', dateString),
    },
    {
      label: t('patientName'),
      type: TYPE_FIELD.TEXT,
      name: 'patientName',
      className: 'w-100',
      allowClear: true,
      value: filter.patientName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('patientName', e.target.value),
    },
    {
      label: t('registrationId'),
      type: TYPE_FIELD.TEXT,
      name: 'registrationId',
      className: 'w-100',
      allowClear: true,
      value: filter.registrationId,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('registrationId', e.target.value),
    },
    {
      label: t('status'),
      type: TYPE_FIELD.SELECT,
      name: 'statusPatient',
      className: 'w-100',
      allowClear: true,
      value: filter.status,
      options: STATUS,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('status', e.target.value),
    },
  ];

  const columns: ColumnsType<TOutpatientAdmission> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('patientName'),
      dataIndex: 'patientName',
    },
    {
      title: t('patientAge'),
      dataIndex: 'patientAge',
    },
    {
      title: t('patientGender'),
      dataIndex: 'patientGender',
    },
    {
      title: t('fromDate'),
      dataIndex: 'fromDate',
    },
    {
      title: t('toDate'),
      dataIndex: 'toDate',
    },
    {
      title: t('registrationId'),
      dataIndex: 'registrationId',
    },
    {
      title: t('status'),
      dataIndex: 'status',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TOutpatientAdmission) => {
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
                // mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Registration_output_patient')}
          extra={
            <ButtonCustom.Create
              type='primary'
              onClick={() => {
                onChangeModalType('add');
                onOpenModal();
              }}
              icon={<PlusOutlined />}
            >
              {t('Add_registration_output_patient')}
            </ButtonCustom.Create>
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
      <RegistrationOutputPatientModal
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

export default RegistrationOutputPatient;
