import { useState } from 'react';
import { Space } from 'antd';
import PageTitle from 'src/components/PageTitle';
import { adminRoute, userFunctionRoute } from 'src/routes/routes.contants';

import UserFunctionFilter from './UserFunctionFilter';
import UserFunctionTable from './UserFunctionTable';

const UserFunction = () => {
  const [filters, setFilters] = useState<{ roleCode?: string }>({});

  return (
    <>
      <Space direction='vertical' className='w-100'>
        <UserFunctionFilter filters={filters} setFilter={setFilters} />
        <UserFunctionTable filters={filters} />
      </Space>
    </>
  );
};

export default UserFunction;
