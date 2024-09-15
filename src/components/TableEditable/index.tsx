/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from 'react';
import { Card, Flex, Space, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { DEFAULT_PAGINATION } from 'src/constants/common/common';

import PaginationCustom from '../PaginationCustom';

import VisibleColumnsDropdown from './VisibleColumnsDropdown';

interface TableEditableProps {
  columns: Array<ColumnType<any>>;
  data: Array<any>;
  id?: string;
  isLoading: boolean;
  isRowSelection?: boolean;
  pagination?: {
    pageSize: number | undefined;
    pageNum: number | undefined;
    totalElements: number | undefined;
    onChange: (page: number, pageSize: number) => void;
  };
  scroll?: {
    x?: number;
    y?: number;
  };
  showVisibleColumns?: boolean;
  title?: ReactNode;
  extra?: ReactNode;
}

const TableEditable: React.FC<
  TableEditableProps & Omit<TableProps<any>, 'title'>
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
  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnType<any>[]>(columns);
  const defaultPagination = pagination
    ? {
        ...pagination,
        pageSize: pagination?.pageSize || DEFAULT_PAGINATION.pageSize,
        pageNum: pagination?.pageNum || DEFAULT_PAGINATION.pageNum,
        totalElements: pagination?.totalElements || 0,
      }
    : undefined;

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    rowSelected: any[],
  ) => {
    const ids = rowSelected.map(row => row.id);
    setSelectedRows(ids);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
    ...props.rowSelection,
  };

  useEffect(() => {
    if (columns) {
      setVisibleColumns(columns);
    }
  }, [columns]);

  return (
    <Card
      title={title}
      extra={
        <Flex justify='center' gap={6}>
          {extra}
          {showVisibleColumns && (
            <>
              <VisibleColumnsDropdown
                originColumns={columns}
                onChange={(visibleColumns: ColumnType<any>[]) => {
                  console.log('visibleColumns:', visibleColumns);
                  setVisibleColumns(visibleColumns);
                }}
              />
            </>
          )}
        </Flex>
      }
    >
      <Space
        size={'small'}
        direction='vertical'
        className='w-100 table-custom-wrapper'
      >
        <Table
          {...props}
          className='table-custom'
          dataSource={
            id
              ? data.map((item, index) => ({ ...item, key: item[id] | index }))
              : data
          }
          scroll={scroll}
          columns={visibleColumns}
          loading={isLoading}
          pagination={false}
          rowSelection={isRowSelection ? rowSelection : undefined}
        />
        {Boolean(defaultPagination) && (
          <PaginationCustom
            page={defaultPagination?.pageNum || DEFAULT_PAGINATION.pageNum}
            pageSize={
              defaultPagination?.pageSize || DEFAULT_PAGINATION.pageSize
            }
            total={defaultPagination?.totalElements || 0}
            onPageChange={defaultPagination?.onChange || (() => {})}
          />
        )}
      </Space>
    </Card>
  );
};

export default TableEditable;
