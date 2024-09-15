import React, { Fragment } from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { TMenu } from 'src/constants/types/admin/menu';

import { FunctionTableType, useColumns } from './config';

import './style.scss';

type Props = {
  menus: (TMenu | null)[];
  setKeys: (keys: Array<React.Key>) => void;
  selectedKeys: Array<React.Key>;
};

const FunctionGroupTable: React.FC<Props> = ({
  menus,
  selectedKeys,
  setKeys,
}) => {
  const columns = useColumns();
  const dataSource = menus.filter((item: any) => item?.children.length > 0);

  const rowSelection: TableRowSelection<FunctionTableType> = {
    selectedRowKeys: selectedKeys,
    onChange: selectedRowKeys => {
      setKeys(selectedRowKeys);
    },
  };
  return (
    <Fragment>
      <Table
        className='user-group-table-container'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          checkStrictly: false,
        }}
        columns={columns}
        dataSource={dataSource as any[]}
        bordered={true}
        pagination={false}
      />
    </Fragment>
  );
};

export default FunctionGroupTable;
