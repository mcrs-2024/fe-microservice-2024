import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TRole } from 'src/constants/types/admin/role';
import { useGetAllRoles } from 'src/helpers/api/admin/role';
type Props = {
  filters: { roleId: string | null };
  setFilters: (filters: { roleId: string | null }) => void;
};
const { SELECT } = TYPE_FIELD;

const ListRole: React.FC<Props> = ({ filters, setFilters }) => {
  const { data: roles } = useGetAllRoles();
  const { t } = useTranslation();
  const inputSearch: InputProps[] = [
    {
      label: t('User_group'),
      type: SELECT,
      name: 'roleId',
      className: 'w-100',
      allowClear: true,
      options: roles?.data.map((role: TRole) => ({
        value: role.id,
        label: role.roleName,
      })),
      value: filters.roleId,
      onChange: (value: string) => {
        setFilters({ roleId: value });
      },
    },
  ];

  return (
    <Card title={t('Search')} className='w-100'>
      <InputFields inputs={inputSearch} />
    </Card>
  );
};

export default ListRole;
