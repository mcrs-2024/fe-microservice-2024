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
  PatientSubjectModalType,
  TFilterPatientSubject,
  TPatientSubject,
} from 'src/constants/types/his/category/patientSubject';
import patientSubjectApi, {
  usePatientSubject,
} from 'src/helpers/api/his/category/patientSubject';
import useFilter from 'src/hooks/useFilter';
import { categoryPatientSubject } from 'src/routes/routes.contants';

import PatientSubjectModal from './PatientSubjectModal';

const PatientSubject = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PatientSubjectModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TPatientSubject | null>(
    null,
  );

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPatientSubject>({
    defaultFilter: {
      patientSubjectsCode: '',
      patientSubjectsName: '',
    },
  });

  const { data, isLoading, mutate } = usePatientSubject(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PatientSubjectModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await patientSubjectApi.deletePatientSubject(id);
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
      label: t('Entity_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'patientSubjectsCode',
      className: 'w-100',
      allowClear: true,
      value: filter.patientSubjectsCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('patientSubjectsCode', e.target.value),
    },
    {
      label: t('Entity_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'patientSubjectsName',
      className: 'w-100',
      allowClear: true,
      value: filter.patientSubjectsName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('patientSubjectsName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPatientSubject> = [
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
      title: t('Entity_Code'),
      dataIndex: 'patientSubjectsCode',
      width: 200,
    },
    {
      title: t('Entity_Name'),
      dataIndex: 'patientSubjectsName',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPatientSubject) => {
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
          { label: t('category'), path: categoryPatientSubject },
          {
            label: t('Entity_Detail_Code'),
            path: categoryPatientSubject,
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
          title={t('Entity')}
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
                {t('Add_Entity')}
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
      <PatientSubjectModal
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

export default PatientSubject;
