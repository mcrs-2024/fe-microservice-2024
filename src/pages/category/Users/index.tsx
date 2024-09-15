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
  CatUsersModalType,
  TCatUsers,
  TFilterCatUsers,
} from 'src/constants/types/category/user';
import accidentApi, { useAccident } from 'src/helpers/api/category/acident';
import useFilter from 'src/hooks/useFilter';
import { useAppSelector } from 'src/hooks/useRedux';
import { addButton, ButtonProps } from 'src/redux toolkit/buttonsSlice';
import { RootStateToolKit } from 'src/redux toolkit/store';
import { categoryDepartment, categoryUsers } from 'src/routes/routes.contants';

import UsersModal from './UserModal/UserModal';

const Users = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CatUsersModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TCatUsers | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterCatUsers>({
    defaultFilter: {
      username: '',
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
      label: t('username'),
      type: TYPE_FIELD.TEXT,
      name: 'username',
      className: 'w-100',
      allowClear: true,
      value: filter.username,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('username', e.target.value),
    },
  ];

  const columns: ColumnsType<TCatUsers> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('facilityID'),
      dataIndex: 'facilityID',
      width: 350,
    },
    {
      title: t('username'),
      dataIndex: 'username',
      width: 350,
    },
    {
      title: t('empID'),
      dataIndex: 'empID',
      width: 350,
    },
    {
      title: t('comment'),
      dataIndex: 'comment',
      width: 350,
    },
    {
      title: t('locked'),
      dataIndex: 'locked',
      width: 350,
    },
    {
      title: t('active'),
      dataIndex: 'active',
      width: 350,
    },
    {
      title: t('areaIsActive'),
      dataIndex: 'areaIsActive',
      width: 350,
    },
    {
      title: t('lastMenuUser'),
      dataIndex: 'lastMenuUser',
      width: 350,
    },
    {
      title: t('lastModuleKey'),
      dataIndex: 'lastModuleKey',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TCatUsers) => {
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
      <UsersModal
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

export default Users;
