import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
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
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
// components
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { ROLE_STATUS } from 'src/constants/enums/Role';
import { TFilterRoles, TRole } from 'src/constants/types/admin/role';
// dummy data
import { UserModalType } from 'src/constants/types/admin/user';
import { rolesApi, useRoles } from 'src/helpers/api/admin/role';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { userRolesRoute } from 'src/routes/routes.contants';

import RoleModal from './RoleModal/RoleModal';

/* status column render */
const StatusColumn = (_: any, record: TRole) => {
  const status = record.status ? 1 : 0;
  if (status === ROLE_STATUS.ACTIVE) return <Tag color='blue'>Active</Tag>;
  if (status === ROLE_STATUS.INACTIVE) return <Tag color='red'>Block</Tag>;
};
const UserRoles = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<UserModalType>('add');
  const [selectedRole, setSelectedRole] = useState<TRole | null>(null);

  const { pagination, onPaginationChange } = useFilter<TFilterRoles>({
    defaultFilter: {
      roleCode: '',
      roleName: '',
      description: '',
      status: true,
    },
  });

  const { data: roles, isLoading, mutate } = useRoles(pagination);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: UserModalType) => {
    setModalType(type);
  };
  const handleDeleteRole = async (ids: string[]) => {
    try {
      const res = await rolesApi.deleteRole({ ids });
      if (res.data.code === 200) {
        message.success(res.data.message);
        mutate();
      } else {
        throw new Error(res.data.message);
      }
      mutate();
    } catch (error) {
      message.error(error);
    }
  };
  const { token } = theme.useToken();

  const columns: ColumnsType<TRole> = [
    {
      title: t('Permission_group_code'),
      dataIndex: 'roleCode',
      render: (roleCode: string) => (
        <Typography.Text style={{ fontWeight: 'bold' }}>
          {roleCode}
        </Typography.Text>
      ),
    },
    {
      title: t('Permission_group_name'),
      dataIndex: 'roleName',
    },
    {
      title: t('description'),
      dataIndex: 'description',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      render: StatusColumn,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_: any, record: TRole) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.View
              onClick={() => {
                setSelectedRole(record);
                onChangeModalType('view');
                onOpenModal();
              }}
              size='small'
              icon={<EyeOutlined />}
              type='link'
            ></ButtonCustom.View>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              onClick={() => {
                setSelectedRole(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('you_want_to_delete_this_employee')}
              onConfirm={() => handleDeleteRole([record.id])}
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
        <TableCustom
          title={t('List_of_permission_groups')}
          showVisibleColumns={false}
          columns={columns}
          data={roles?.data?.content || []}
          isLoading={!roles && isLoading}
          pagination={{
            pageSize: roles?.data?.pageSize,
            pageNum: roles?.data?.pageNum,
            totalElements: roles?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>

      <RoleModal
        modalType={modalType}
        show={isOpenModal}
        role={selectedRole}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default UserRoles;
