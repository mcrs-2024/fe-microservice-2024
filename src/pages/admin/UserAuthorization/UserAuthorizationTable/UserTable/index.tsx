import React, { forwardRef, Fragment, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import TableCustom from 'src/components/TableCustom';
import { TFilterSimpleUsers, TUser } from 'src/constants/types/admin/user';
import { useUsersByRole } from 'src/helpers/api/admin/user';
import useFilter from 'src/hooks/useFilter';

import './style.scss';

type Props = {
  roleId: string | null;
  type: 'In' | 'NotIn';
  setKeys: (keys: Array<React.Key>) => void;
  selectedKeys: Array<React.Key>;
};

const UserTable = forwardRef(
  ({ roleId, type, selectedKeys, setKeys }: Props, ref) => {
    const { t } = useTranslation();
    const columns: ColumnsType<any> = [
      {
        key: 1,
        title: t('Employee_name'),
        dataIndex: 'fullName',
        width: '40%',
      },
      {
        key: 2,
        title: t('Email'),
        dataIndex: 'email',
        width: '30%',
      },
      {
        key: 3,
        title: t('Department'),
        dataIndex: '',
        width: '30%',
      },
    ];
    const { pagination, onPaginationChange } = useFilter<TFilterSimpleUsers>({
      defaultFilter: {
        fullname: '',
        email: '',
      },
    });

    const {
      data: usersByRole,
      isLoading,
      mutate,
    } = useUsersByRole(roleId, type, pagination);
    useImperativeHandle(ref, () => {
      return {
        mutate: () => mutate(),
      };
    }, []);

    const rowSelection: TableRowSelection<TUser> = {
      selectedRowKeys: selectedKeys,
      onChange: selectedRowKeys => {
        setKeys(selectedRowKeys);
      },
    };

    return (
      <Fragment>
        <TableCustom
          showVisibleColumns={false}
          columns={columns}
          data={usersByRole?.data?.content || []}
          rowKey={record => record.id}
          isLoading={!usersByRole && isLoading}
          className='user-authorization-container'
          isRowSelection={true}
          rowSelection={rowSelection}
          pagination={{
            pageSize: usersByRole?.data?.pageSize,
            pageNum: usersByRole?.data?.pageNum,
            totalElements: usersByRole?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Fragment>
    );
  },
);

export default UserTable;
