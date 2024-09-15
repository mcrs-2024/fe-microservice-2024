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
import { CHAPTER_STATUS } from 'src/constants/enums/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PATIENT_TREATMENT_STATUS } from 'src/constants/enums/patientTreatment';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  PatientTreatmentModalType,
  TFilterPatientTreatment,
  TPatientTreatment,
} from 'src/constants/types/category/patientTreatment';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import patientTreatmentApi, {
  usePatientTreatment,
} from 'src/helpers/api/category/patientTreatment';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICDGroups } from 'src/routes/routes.contants';

import ChapterModal from './PatientTreatmentModal';

const StatusColumn = (privateFlag: boolean) => {
  if (privateFlag === PATIENT_TREATMENT_STATUS.ACTIVE)
    return <Tag color='blue'>Có</Tag>;
  if (privateFlag === PATIENT_TREATMENT_STATUS.INACTIVE)
    return <Tag color='red'>Không</Tag>;
};

const PatientTreatment = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PatientTreatmentModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TPatientTreatment | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPatientTreatment>({
    defaultFilter: {
      patientTreatmentTemplateName: '',
    },
  });
  const { data, isLoading, mutate } = usePatientTreatment(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PatientTreatmentModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await patientTreatmentApi.deletePatientTreatment(id);
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
      label: t('Name_template'),
      type: TYPE_FIELD.TEXT,
      name: 'patientTreatmentTemplateName',
      className: 'w-100',
      allowClear: true,
      value: filter.patientTreatmentTemplateName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('patientTreatmentTemplateName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPatientTreatment> = [
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
      title: t('Name_template'),
      dataIndex: 'patientTreatmentTemplateName',
    },
    {
      title: t('PrivateUse'),
      dataIndex: 'privateFlag',
      render: privateFlag => StatusColumn(privateFlag),
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPatientTreatment) => {
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
            <InputFields inputs={inputSearch} gutter={[0, 8]}></InputFields>
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
          title={t('Template_change_reference')}
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

export default PatientTreatment;
