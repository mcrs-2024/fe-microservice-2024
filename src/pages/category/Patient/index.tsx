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
import { CatDepartmentModalType } from 'src/constants/types/category/department';
import {
  PatientModalType,
  TFilterPatient,
  TPatient,
} from 'src/constants/types/category/patient';
import accidentApi, { useAccident } from 'src/helpers/api/category/acident';
import useFilter from 'src/hooks/useFilter';
import { useAppSelector } from 'src/hooks/useRedux';
import { addButton, ButtonProps } from 'src/redux toolkit/buttonsSlice';
import { RootStateToolKit } from 'src/redux toolkit/store';
import { categoryDepartment, categoryUsers } from 'src/routes/routes.contants';

import PatientModal from './PatientModal/PatientModal';

const Patient = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PatientModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TPatient | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPatient>({
    defaultFilter: {
      fullName: '',
    },
  });
  //   const { data, isLoading, mutate } = useAccident(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: CatDepartmentModalType) => {
    setModalType(type);
  };
  const handleDelete = async (casualtyCode: string) => {
    try {
      const res = await accidentApi.deleteAcident(casualtyCode);
      if (res.data.code) {
        message.success(res.data.message);
        // mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('fullName'),
      type: TYPE_FIELD.TEXT,
      name: 'fullName',
      className: 'w-100',
      allowClear: true,
      value: filter.fullName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('fullName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPatient> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'patientId',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('facilityId'),
      dataIndex: 'facilityId',
      width: 350,
    },
    {
      title: t('patientHospitalId'),
      dataIndex: 'patientHospitalId',
      width: 350,
    },
    {
      title: t('fullName'),
      dataIndex: 'fullName',
      width: 350,
    },
    {
      title: t('fullNameUnUnicode'),
      dataIndex: 'fullNameUnUnicode',
      width: 350,
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      width: 350,
    },
    {
      title: t('genderText'),
      dataIndex: 'genderText',
      width: 350,
    },
    {
      title: t('dob'),
      dataIndex: 'dob',
      width: 350,
    },
    {
      title: t('dobDD'),
      dataIndex: 'dobDD',
      width: 350,
    },
    {
      title: t('dobMM'),
      dataIndex: 'dobMM',
      width: 350,
    },
    {
      title: t('dobYYYY'),
      dataIndex: 'dobYYYY',
      width: 350,
    },
    {
      title: t('ethnicityId'),
      dataIndex: 'ethnicityId',
      width: 350,
    },
    {
      title: t('occupationId'),
      dataIndex: 'occupationId',
      width: 350,
    },
    {
      title: t('nationalId'),
      dataIndex: 'nationalId',
      width: 350,
    },
    {
      title: t('fullAddress'),
      dataIndex: 'fullAddress',
      width: 350,
    },
    {
      title: t('street'),
      dataIndex: 'street',
      width: 350,
    },
    {
      title: t('countryId'),
      dataIndex: 'countryId',
      width: 350,
    },
    {
      title: t('provinceId'),
      dataIndex: 'provinceId',
      width: 350,
    },
    {
      title: t('districtId'),
      dataIndex: 'districtId',
      width: 350,
    },
    {
      title: t('wardId'),
      dataIndex: 'wardId',
      width: 350,
    },
    {
      title: t('mobile'),
      dataIndex: 'mobile',
      width: 350,
    },
    {
      title: t('mobile2'),
      dataIndex: 'mobile2',
      width: 350,
    },
    {
      title: t('isNameless'),
      dataIndex: 'isNameless',
      width: 350,
    },
    {
      title: t('vaccineCode'),
      dataIndex: 'vaccineCode',
      width: 350,
    },
    {
      title: t('patientPortalUsername'),
      dataIndex: 'patientPortalUsername',
      width: 350,
    },
    {
      title: t('patientPortalPassword'),
      dataIndex: 'patientPortalPassword',
      width: 350,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      width: 350,
    },
    {
      title: t('birthCertificate'),
      dataIndex: 'birthCertificate',
      width: 350,
    },
    {
      title: t('idPassport'),
      dataIndex: 'idPassport',
      width: 350,
    },
    {
      title: t('isMerged'),
      dataIndex: 'isMerged',
      width: 350,
    },
    {
      title: t('isDeleted'),
      dataIndex: 'isDeleted',
      width: 350,
    },
    {
      title: t('note'),
      dataIndex: 'note',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPatient) => {
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
              onConfirm={() => handleDelete(record.casualtyCode)}
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
              span={{ sm: 24 }}
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
          title={t('Users')}
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
          scroll={{ x: 800, y: 800 }}
          //   data={data?.data?.content || []}
          //   isLoading={isLoading}
          //   id='id'
          //   pagination={{
          //     pageSize: data?.data?.pageSize,
          //     pageNum: data?.data?.pageNum,
          //     totalElements: data?.data?.totalElements,
          //     onChange: onPaginationChange,
          //   }}
        />
      </Space>
      {/* edit modal */}
      <PatientModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          //   mutate();
        }}
      />
    </>
  );
};

export default Patient;
