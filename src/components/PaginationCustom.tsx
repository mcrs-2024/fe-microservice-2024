import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination, PaginationProps } from 'antd';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
};

const PaginationCustom: React.FC<Props & PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  ...rest
}) => {
  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.stopPropagation();
        }
      }}
    >
      <Pagination
        {...rest}
        defaultCurrent={0}
        current={page + 1}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onShowSizeChange={onPageChange}
        defaultPageSize={pageSize}
        onChange={(page, pageSize) => {
          onPageChange(page - 1, pageSize);
        }}
        pageSizeOptions={['10', '20', '50', '100']}
        showQuickJumper={total > 200}
        locale={{
          jump_to: 'Đến trang',
          jump_to_confirm: 'Xác nhận',
          items_per_page: 'bản ghi/trang',
          next_3: '3 trang tiếp',
          next_5: '5 trang tiếp',
          next_page: 'Trang tiếp',
          page: '',
          prev_3: '3 trang trước',
          prev_5: '5 trang trước',
          prev_page: 'Trang trước',
        }}
      />
    </div>
  );
};

export default PaginationCustom;
