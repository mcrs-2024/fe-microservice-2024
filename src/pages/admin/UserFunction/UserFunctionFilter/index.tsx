import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TRole } from 'src/constants/types/admin/role';
import { useGetAllRoles } from 'src/helpers/api/admin/role';

type Props = {
  filters: { roleCode?: string };
  setFilter: (filters: { roleCode?: string }) => void;
};

const { SELECT } = TYPE_FIELD;

const UserFunctionFilter: React.FC<Props> = ({ filters, setFilter }) => {
  const rolesSWR = useGetAllRoles();
  const { t } = useTranslation();
  const inputSearch: InputProps[] = [
    {
      label: t('User_group'),
      type: SELECT,
      name: 'roleCode',
      className: 'w-100',
      allowClear: true,
      options:
        rolesSWR?.data?.data?.map((item: TRole) => {
          return {
            label: item.roleName,
            value: item.roleCode,
          };
        }) || [],
      value: filters.roleCode,
      onChange: (value: string) => setFilter({ roleCode: value }),
    },
  ];

  return (
    <Card title={t('Search')} className='w-100'>
      <InputFields inputs={inputSearch} />
    </Card>
  );
};

export default UserFunctionFilter;
