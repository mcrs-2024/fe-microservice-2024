import { ChangeEvent, useState } from 'react';
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
import {
  AdmissionDeskCodeModalType,
  TAdmissionDeskCode,
} from 'src/constants/types/his/category/admissionDeskCode';
import admissionDeskCodeApi, {
  useAdmissionDeskCode,
} from 'src/helpers/api/his/category/admissionDeskCode';
import useFilter from 'src/hooks/useFilter';
import { medicalSuppliesStoreRoute } from 'src/routes/routes.contants';

import AdmissionDeskCodeModal from './AdmissionDeskCodeModal';

const AdmissionDeskCode = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<AdmissionDeskCodeModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TAdmissionDeskCode | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TAdmissionDeskCode>({
    defaultFilter: {
      admissionDeskCode: '',
      admissionDeskName: '',
    },
  });

  const { data, isLoading, mutate } = useAdmissionDeskCode(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: AdmissionDeskCodeModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await admissionDeskCodeApi.deleteAdmissionDeskCode(id);
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
      label: t('Admission_Desk_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'admissionDeskCode',
      className: 'w-100',
      allowClear: true,
      value: filter.admissionDeskCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('admissionDeskCode', e.target.value),
    },
    {
      label: t('Admission_Desk_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'admissionDeskName',
      className: 'w-100',
      allowClear: true,
      value: filter.admissionDeskName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('admissionDeskName', e.target.value),
    },
  ];

  const columns: ColumnsType<TAdmissionDeskCode> = [
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
      title: t('Admission_Desk_Code'),
      dataIndex: 'admissionDeskCode',
      width: 200,
    },
    {
      title: t('Admission_Desk_Name'),
      dataIndex: 'admissionDeskName',
      width: 200,
    },
    {
      title: t('Admission_Area_Code_ID'),
      dataIndex: 'admissionAreaId',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TAdmissionDeskCode) => {
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
          { label: t('category'), path: medicalSuppliesStoreRoute },
          {
            label: t('Admission_Desk_Code'),
            path: medicalSuppliesStoreRoute,
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
          title={t('Admission_Desk_Code')}
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
                {t('Add_Admission_Desk_Code')}
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
      <AdmissionDeskCodeModal
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

export default AdmissionDeskCode;
