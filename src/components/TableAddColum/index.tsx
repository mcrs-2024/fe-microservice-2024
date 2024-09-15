import React, { useEffect, useState } from 'react';
import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';

interface TableCustomProps {
  columns: ColumnType<any>[];
  data: any[];
  scroll?: any;
  id?: string;
  isLoading?: boolean;
  pagination?: any;
  isRowSelection?: boolean;
  showVisibleColumns?: boolean;
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

const TableAddColum: React.FC<
  TableCustomProps & Omit<TableProps<any>, 'title'>
> = ({
  columns,
  data,
  scroll,
  id,
  isLoading,
  pagination,
  isRowSelection = false,
  showVisibleColumns = true,
  title,
  extra,
  ...props
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  return (
    <div>
      <Table
        bordered
        columns={columns}
        rowSelection={isRowSelection ? {} : undefined}
        dataSource={tableData}
        {...props}
      />
    </div>
  );
};

export default TableAddColum;
