/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, message, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import ButtonCustom from 'src/components/ButtonCustom';
import { TRole } from 'src/constants/types';
import {
  TPermission,
  TRolePermissions,
} from 'src/constants/types/admin/permisson';
// components
import { useGetAllRoles } from 'src/helpers';
// dummy data
import {
  rolePermissionsApi,
  useGetAllPermissions,
  useGetRolePermissionByModule,
} from 'src/helpers/api/admin/rolePermission';

import './style.scss';

const Cell = (props: {
  isActive: boolean;
  onChange: (value: boolean) => void;
}) => {
  const { isActive, onChange } = props;
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backgroundColor: isActive ? '#f6f6f6' : '#fff',
        transition: { duration: 0.2 },
      }}
      transition={{ type: 'spring' }}
      onClick={() => {
        onChange(!isActive);
      }}
      className={classNames('matrix-authorization-table-cell-box', {
        'matrix-authorization-table-cell-box-active': isActive,
      })}
    >
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0 }}
        animate={isActive ? 'show' : 'hide'}
        variants={{
          hide: { opacity: 0 },
          show: { opacity: 1 },
        }}
      >
        <CheckOutlined
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#00c2e6',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
type Props = {
  moduleId: number | null;
};

const MatrixAuthorizationTable = ({ moduleId }: Props) => {
  const { t } = useTranslation();
  // get all columns

  const { data: roles, isLoading: isLoadingRoles } = useGetAllRoles();
  const { data: permissions, isLoading: isLoadingPermissions } =
    useGetAllPermissions();
  const {
    data: rolePermissions,
    isLoading,
    mutate,
  } = useGetRolePermissionByModule(moduleId);
  const [rolePermissionsData, setRolePermissionsData] = useState<
    TRolePermissions[]
  >([]);
  const [dataSource, setDataSource] = useState([]);
  const defaultColumns: ColumnsType<any> = [
    {
      title: (
        <div
          style={{
            position: 'relative',
            height: '40px',
            width: '100%',
            backgroundColor: '#f6f6f6',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: '5px',
            }}
          >
            {t('Role')}
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '-30px',
            }}
          >
            {t('Permission')}
          </span>
        </div>
      ),
      dataIndex: 'roleCode',
      rowScope: 'row',
      width: '120px',
    },
    // {
    //   title: 'Thêm mới',
    //   dataIndex: 'create',
    //   align: 'center',
    //   render: (value: any) => <Cell value={value} />,
    //   onCell: (value: any, index) => {
    //     return {
    //       onClick: () => {
    //         console.log('click:', value);
    //       },
    //     };
    //   },
    // },
  ];
  const [columns, setColumns] = useState<ColumnsType<any>>(defaultColumns);
  const handleChangeActive = (
    isActive: boolean,
    roleCode: string,
    permissionCode: string,
    rowIndex: number,
  ) => {
    setRolePermissionsData(prev => {
      const newRolePermissionsData = [...prev];
      console.log('newRolePermissionsData:', newRolePermissionsData);
      const rolePermissionIndex = newRolePermissionsData.findIndex(
        item => item.roleCode === roleCode,
      );
      console.log('rolePermissionIndex:', rolePermissionIndex);
      if (rolePermissionIndex !== -1) {
        const rolePermission = newRolePermissionsData[rolePermissionIndex];
        if (isActive) {
          rolePermission.permissionCodes.push(permissionCode);
        } else {
          rolePermission.permissionCodes =
            rolePermission.permissionCodes.filter(
              item => item !== permissionCode,
            );
        }
        newRolePermissionsData[rolePermissionIndex] = rolePermission;
      } else {
        console.log('isActive:', isActive);
        if (isActive) {
          newRolePermissionsData.splice(rowIndex, 0, {
            roleCode,
            permissionCodes: [permissionCode],
          });
        } else {
          newRolePermissionsData.splice(rowIndex, 0, {
            roleCode,
            permissionCodes: [],
          });
        }
      }
      console.log('return:', newRolePermissionsData);
      return newRolePermissionsData;
    });
  };
  const handleRenderColumns = (permissionsData: TPermission[]) => {
    if (permissionsData?.length > 0) {
      const result = permissionsData.map((item: TPermission) => {
        return {
          title: item.description,
          dataIndex: item.permissionCode,
          align: 'center',
          render: (value: boolean, record: any, index: number) => {
            return (
              <Cell
                isActive={value}
                onChange={(isActive: boolean) => {
                  handleChangeActive(
                    isActive,
                    record.roleCode,
                    item.permissionCode,
                    index,
                  );
                }}
              />
            );
          },
        };
      });
      setColumns(prev => [...prev, ...(result as ColumnsType<any>)]);
    }
  };
  const renderPermission = (
    role: TRole,
    rolePermissionsData: TRolePermissions[],
  ) => {
    // turn keyof permissions array into object and return it
    const result: any = {};
    const permissionCodes: string[] =
      permissions?.data.map((item: TPermission) => item.permissionCode) || [];

    permissionCodes.forEach(permissionCode => {
      result[permissionCode] = rolePermissionsData.some(rolePermission => {
        const sameRole = rolePermission.roleCode === role.roleCode;
        const samePermission =
          rolePermission.permissionCodes.includes(permissionCode);
        return sameRole && samePermission;
      })
        ? true
        : false;
    });
    return result;
  };

  const handleRenderData = (
    roles: TRole[],
    rolePermissionsData: TRolePermissions[],
  ) => {
    if (roles?.length > 0) {
      const result = roles.map(item => {
        return {
          key: item.id,
          roleCode: item.roleCode,
          ...renderPermission(item, rolePermissionsData),
        };
      });
      setDataSource(result as any);
    }
    return [];
  };
  const handleSave = async () => {
    console.log('rolePermissionsData:', rolePermissionsData);
    if (moduleId == null) return;
    try {
      const res = await rolePermissionsApi.assignPermissionToRoleByModule({
        moduleId: moduleId,
        data: rolePermissionsData,
      });
      console.log('res:', res);
      if (res.data.code === 200) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  useEffect(() => {
    if (permissions?.data) {
      console.log('handleRenderColumns re-render');
      handleRenderColumns(permissions?.data || []);
    }
  }, [permissions?.data?.length]);
  useEffect(() => {
    if (rolePermissions?.data) {
      console.log('setRolePermissionsData re-render');
      setRolePermissionsData(rolePermissions?.data || []);
    }
  }, [rolePermissions]);
  useEffect(() => {
    if (roles?.data && rolePermissionsData) {
      console.log('handleRenderData re-render');

      handleRenderData(roles?.data || [], rolePermissionsData || []);
    }
  }, [roles?.data?.length, JSON.stringify(rolePermissionsData)]);

  return (
    <Row style={{ width: '100%' }}>
      <Card
        title={t('Feature_authorization_for_Role')}
        extra={
          <ButtonCustom.Edit
            type='primary'
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={moduleId === null}
          >
            {t('Save')}
          </ButtonCustom.Edit>
        }
      >
        <Table
          loading={isLoading || isLoadingRoles || isLoadingPermissions}
          bordered={true}
          className='matrix-authorization-table'
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </Card>
    </Row>
  );
};

export default MatrixAuthorizationTable;
