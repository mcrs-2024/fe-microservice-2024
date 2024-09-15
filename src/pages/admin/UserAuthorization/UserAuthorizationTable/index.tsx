import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button, message, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import { rolesApi } from 'src/helpers/api/admin/role';

import UserTable from './UserTable';

import './style.scss';
type Props = {
  filters: { roleId: string | null };
};

const UserAuthorizationTable: React.FC<Props> = ({ filters }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [keysUserNotInRole, setKeysUserNotInRole] = useState<React.Key[]>([]);
  const [keysUserInRole, setKeysUserInRole] = useState<React.Key[]>([]);
  const userInRoleTableRef = useRef<{
    mutate: () => void;
  }>(null);

  const userNotInRoleTableRef = useRef<{
    mutate: () => void;
  }>(null);

  const handleGetUsers = async () => {
    try {
      setIsLoading(true);
      userInRoleTableRef.current?.mutate();
      userNotInRoleTableRef.current?.mutate();
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filters.roleId) handleGetUsers();
  }, [filters.roleId]);

  const addUserToRole = async () => {
    if (filters?.roleId) {
      const resAssignUser = await rolesApi.assignUser({
        roleId: filters?.roleId,
        userIds: keysUserNotInRole.map(key => key.toString()),
      });

      if (resAssignUser.data.code === 200) {
        userInRoleTableRef.current?.mutate();
        userNotInRoleTableRef.current?.mutate();
      } else message.error(resAssignUser.data.message);
    }
    setKeysUserNotInRole([]);
  };

  const removeUserFromRole = async () => {
    if (filters?.roleId) {
      const reRemoveUser = await rolesApi.removeUser({
        roleId: filters?.roleId,
        userIds: keysUserInRole.map(key => key.toString()),
      });
      if (reRemoveUser.data.code === 200) {
        userInRoleTableRef.current?.mutate();
        userNotInRoleTableRef.current?.mutate();
      } else message.error(reRemoveUser.data.message);
    }
    setKeysUserInRole([]);
  };

  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: t('User_not_in_group'),
      dataIndex: '',
      width: '48%',
      render: () => (
        <UserTable
          roleId={filters.roleId}
          ref={userNotInRoleTableRef}
          type='NotIn'
          selectedKeys={keysUserNotInRole}
          setKeys={setKeysUserNotInRole}
        />
      ),
    },
    {
      key: 2,
      align: 'center',
      title: (
        <Row justify={'center'}>
          <ButtonCustom.View
            icon={<RollbackOutlined />}
            onClick={handleGetUsers}
          />
        </Row>
      ),
      dataIndex: '',
      width: '4%',
      render: () => (
        <Row align={'middle'} justify={'center'}>
          <Space direction='vertical'>
            <ButtonCustom.Edit
              onClick={removeUserFromRole}
              danger
              type='primary'
              icon={<DoubleLeftOutlined />}
            />
            <ButtonCustom.Edit
              onClick={addUserToRole}
              type='primary'
              icon={<DoubleRightOutlined />}
            />
          </Space>
        </Row>
      ),
    },
    {
      key: 3,
      title: t('User_in_group'),
      dataIndex: '',
      width: '48%',
      render: () => (
        <UserTable
          roleId={filters.roleId}
          ref={userInRoleTableRef}
          type='In'
          selectedKeys={keysUserInRole}
          setKeys={setKeysUserInRole}
        />
      ),
    },
  ];

  return (
    <div className='user-authorization-table-container'>
      <div className='user-authorization-table'>
        <TableCustom
          title={t('User_authorization')}
          data={[{}]}
          showVisibleColumns={false}
          columns={columns}
          bordered={true}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UserAuthorizationTable;
