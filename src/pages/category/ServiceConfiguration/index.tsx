import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
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
import { POSITION_OPTIONS } from 'src/constants/dumb/admin';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { USER_STATUS } from 'src/constants/enums/User';
import {
  ServiceConfigModalType,
  TFilterServiceConfig,
  TServiceConfig,
} from 'src/constants/types/category/serviceConfiguration';
import userApi, { useUsers } from 'src/helpers/api/admin/user';
import serviceConfigurationApi, {
  useServiceConfiguration,
} from 'src/helpers/api/category/serviceConfiguration';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import {
  categoryICDGroups,
  categoryRoute,
  categoryServiceConfig,
} from 'src/routes/routes.contants';
import { createPreviewURL } from 'src/utils/image';

import ServiceConfigurationModal from './ServiceConfigurationModal/ServiceConfigModal';

/* status column render */
const StatusColumn = (status: number) => {
  if (status === USER_STATUS.ACTIVE) return <Tag color='blue'>Active</Tag>;
  if (status === USER_STATUS.INACTIVE) return <Tag color='red'>Block</Tag>;
};

const ServiceConfiguration = () => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ServiceConfigModalType>('add');
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ServiceConfigModalType) => {
    setModalType(type);
  };

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
  } = useFilter<TFilterServiceConfig>({
    defaultFilter: {
      specialist: '',
      staff: '',
      serviceName: '',
      categoryName: '',
      specialtyName: '',
      typeOfExam: '',
      departmentTH: '',
      performer: '',
      interactRank: '',
      order: '',
      note: '',
      isActive: '',
    },
  });

  const { token } = theme.useToken();

  const { data, isLoading, mutate } = useServiceConfiguration(
    pagination,
    debouncedFilter,
  );

  const handleDeleteServiceConfiguration = async (id: string) => {
    try {
      const res = await serviceConfigurationApi.deleteServiceConfiguration(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const inputSearch: InputProps[] = [
    {
      label: t('Type_of_exam'),
      type: TYPE_FIELD.TEXT,
      name: 'typeOfExam',
      className: 'w-100',
      allowClear: true,
      value: filter.typeOfExam,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('categoryName', e.target.value),
    },
    {
      label: t('Service'),
      type: TYPE_FIELD.TEXT,
      name: 'Service',
      className: 'w-100',
      allowClear: true,
      value: filter.serviceName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('serviceName', e.target.value),
    },
    {
      label: t('Specialty'),
      type: TYPE_FIELD.TEXT,
      name: 'typeOfExam',
      className: 'w-100',
      allowClear: true,
      value: filter.typeOfExam,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('typeOfExam', e.target.value),
    },
    {
      label: t('Staff'),
      type: TYPE_FIELD.TEXT,
      name: 'staff',
      className: 'w-100',
      allowClear: true,
      value: filter.staff,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('staff', e.target.value),
    },
    {
      label: t('Specialist'),
      type: TYPE_FIELD.TEXT,
      name: 'specialist',
      className: 'w-100',
      allowClear: true,
      value: filter.typeOfExam,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('specialist', e.target.value),
    },
    {
      label: t('isActive'),
      type: TYPE_FIELD.TEXT,
      name: 'specialist',
      className: 'w-100',
      allowClear: true,
      value: filter.typeOfExam,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('specialist', e.target.value),
    },
  ];
  const columns: ColumnsType<TServiceConfig> = [
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
      title: t('visitTypeCode'),
      dataIndex: 'visitTypeCode',
    },
    {
      title: t('clinicalSpecialtyId'),
      dataIndex: 'clinicalSpecialtyId',
    },
    {
      title: t('serviceId'),
      dataIndex: 'serviceId',
    },
    {
      title: t('employeeId'),
      dataIndex: 'employeeId',
    },
    {
      title: t('departmentId'),
      dataIndex: 'departmentId',
    },
    {
      title: t('createdBy'),
      dataIndex: 'createdBy',
    },
    {
      title: t('Note_service_configuration'),
      dataIndex: 'comment',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TServiceConfig) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                // setSelectedUser(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa nhân viên này?'
              onConfirm={() => handleDeleteServiceConfiguration(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                danger
                icon={<DeleteOutlined />}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <Row style={{ paddingLeft: '9px' }} justify='end'>
            <Button icon={<ReloadOutlined />} style={{ marginRight: '1%' }}>
              {t('Delete_Search')}
            </Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </Row>
        </Card>
        {/* products list */}
        <TableCustom
          columns={columns}
          title={t('Service_configuration')}
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
          isLoading={false}
          isRowSelection={true}
          loading={false}
          id='id'
          data={data?.data?.content || []}
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>

      <ServiceConfigurationModal
        key={1}
        modalType={modalType}
        show={isOpenModal}
        category={null}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default ServiceConfiguration;
