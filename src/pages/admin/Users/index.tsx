import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
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
  TFilterUsers,
  TUser,
  UserModalType,
} from 'src/constants/types/admin/user';
import userApi, { useUsers } from 'src/helpers/api/admin/user';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { adminRoute, usersRoute } from 'src/routes/routes.contants';
import { createPreviewURL } from 'src/utils/image';

import UserModal from './UserModal/UserModal';
import UserDetail from './UserDetail';

/* status column render */
const StatusColumn = (status: number) => {
  if (status === USER_STATUS.ACTIVE) return <Tag color='blue'>Active</Tag>;
  if (status === USER_STATUS.INACTIVE) return <Tag color='red'>Block</Tag>;
};

const Users = () => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<UserModalType>('add');
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const dispatch = useDispatch();

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: UserModalType) => {
    setModalType(type);
  };

  const { pagination, onPaginationChange, filter, setFilter, onChangeFilter } =
    useFilter<TFilterUsers>({
      defaultFilter: {
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        userNumber: '',
        addressStreet: '',
        addressWard: '',
        addressDistrict: '',
        addressProvince: '',
      },
    });

  const { data: users, isLoading, mutate } = useUsers(pagination, filter);
  const { token } = theme.useToken();
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await userApi.deleteUser(userId);
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
      label: 'Email',
      type: TYPE_FIELD.TEXT,
      name: 'email',
      className: 'w-100',
      allowClear: true,
      value: filter.email,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('email', e.target.value),
    },
  ];
  const columns: ColumnsType<TUser> = [
    {
      title: t('Employee_Name'),
      dataIndex: 'fullName',
      width: 250,
      render: (_, record: TUser) => {
        return (
          <Space size={'small'}>
            <Avatar
              size={'small'}
              src={createPreviewURL(record.avatar)}
              icon={<UserOutlined />}
              shape='square'
            />
            {record.fullName}
          </Space>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: t('location'),
      dataIndex: 'positionId',
      render: (value: number | null) =>
        POSITION_OPTIONS.find(p => p.value === value)?.label,
    },
    {
      title: t('phoneNumber'),
      dataIndex: 'phoneNumber',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      render: StatusColumn,
      width: 100,
      align: 'center',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TUser) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.View
              onClick={() => {
                setSelectedUser(record);
                onChangeModalType('view');
                onOpenModal();
              }}
              size='small'
              icon={<EyeOutlined />}
              type='link'
            ></ButtonCustom.View>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedUser(record);
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

  useEffect(() => {
    dispatch(
      addButton({
        action: PERMISSION_CODES.CREATE,
        id: 'addButton',
        className: 'btn-sub',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () => {
          onChangeModalType('add');
          onOpenModal();
        },
        children: 'Add',
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields inputs={inputSearch} />
          </Row>
        </Card>
        {/* products list */}
        <TableCustom
          columns={columns}
          title={t('List_of_employees')}
          data={users?.data?.content || []}
          isLoading={isLoading}
          isRowSelection={true}
          loading={isLoading}
          id='id'
          pagination={{
            pageSize: users?.data?.pageSize,
            pageNum: users?.data?.pageNum,
            totalElements: users?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>

      <UserModal
        key={selectedUser?.id}
        modalType={modalType}
        show={isOpenModal}
        user={selectedUser}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
      <UserDetail
        user={selectedUser}
        show={modalType === 'view' && isOpenModal}
        onHide={onCloseModal}
      />
    </>
  );
};

export default Users;
