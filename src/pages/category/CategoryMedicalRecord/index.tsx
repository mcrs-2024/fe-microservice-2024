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
  CategoryModalType,
  TCategory,
} from 'src/constants/types/category/category';
import { TMedicalRecord } from 'src/constants/types/category/medicalRecord';
import userApi from 'src/helpers/api/admin/user';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICDGroups } from 'src/routes/routes.contants';

import GroupICDModal from './GroupMedicalRecordModal/GroupMedicalRecordModal';

const MedicalRecord = () => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CategoryModalType>('add');

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: CategoryModalType) => {
    setModalType(type);
  };

  const { pagination, onPaginationChange, filter, setFilter, onChangeFilter } =
    useFilter<TMedicalRecord>({
      defaultFilter: {
        sst: '',
        label: '',
        Specialist: '',
        PrivateUse: '',
      },
    });

  const { token } = theme.useToken();
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await userApi.deleteUser(userId);
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
      label: t('label'),
      type: TYPE_FIELD.TEXT,
      name: 'label',
      className: 'w-100',
      allowClear: true,
      value: filter.label,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('label', e.target.value),
    },
    {
      label: t('Specialist'),
      type: TYPE_FIELD.SELECT,
      name: 'Specialist',
      className: 'w-100',
      allowClear: true,
      value: filter.Specialist,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('Specialist', e.target.value),
    },
  ];
  const columns: ColumnsType<TCategory> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'fullName',
      width: 250,
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('label'),
      dataIndex: 'label',
    },
    {
      title: t('Specialist'),
      dataIndex: 'Specialist',
    },
    {
      title: t('PrivateUse'),
      dataIndex: 'PrivateUse',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TCategory) => {
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
              onConfirm={() => handleDeleteUser(record.id)}
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

  const sampleData = [
    {
      id: 1,
      label: 'A01',
      Specialist: 'Khoa nhi',
      PrivateUse: 1,
    },
    {
      id: 2,
      label: 'A02',
      Specialist: 'Khoa mắt',
      PrivateUse: 2,
    },
    {
      id: 3,
      label: 'A03',
      Specialist: 'Khoa tim',
      PrivateUse: 3,
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 12 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <Row
            style={{
              paddingLeft: '9px',
              justifyContent: 'end',
            }}
          >
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
          title={t('medical_file_template')}
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
          data={sampleData}
          isLoading={false}
          isRowSelection={true}
          loading={false}
          id='id'
          // pagination={{
          //   pageSize: users?.data?.pageSize,
          //   pageNum: users?.data?.pageNum,
          //   totalElements: users?.data?.totalElements,
          //   onChange: onPaginationChange,
          // }}
        />
      </Space>

      <GroupICDModal
        key={1}
        modalType={modalType}
        show={isOpenModal}
        category={null}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          // mutate();
        }}
      />
    </>
  );
};

export default MedicalRecord;
