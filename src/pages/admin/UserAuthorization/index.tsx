import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
// components
import PageTitle from 'src/components/PageTitle';
import { adminRoute, userAuthorizationRoute } from 'src/routes/routes.contants';

// dummy data
import ListRole from './ListRole';
import UserAuthorizationTable from './UserAuthorizationTable';

const UserAuthorization = () => {
  const [filters, setFilters] = useState<{ roleId: string | null }>({
    roleId: null,
  });
  const { t } = useTranslation();
  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <ListRole filters={filters} setFilters={setFilters} />
        <UserAuthorizationTable filters={filters} />
      </Space>
    </>
  );
};

export default UserAuthorization;
