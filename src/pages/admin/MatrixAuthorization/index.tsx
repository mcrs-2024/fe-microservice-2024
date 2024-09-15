import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Space } from 'antd';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
// components
import PageTitle from 'src/components/PageTitle';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { useGetAllModules } from 'src/helpers/api/admin/rolePermission';
import useFilter from 'src/hooks/useFilter';
// dummy data
import { systemLogsRoute } from 'src/routes/routes.contants';
import { transformToOptions } from 'src/utils';

import MatrixAuthorizationTable from './MatrixAuthorizationTable';

type TFilter = {
  moduleId: number | null;
};
const MatrixAuthorization = () => {
  const { t } = useTranslation();
  const { data: modules } = useGetAllModules();

  const { filter, setFilter } = useFilter<TFilter>({
    defaultFilter: {
      moduleId: null,
    },
  });

  const inputSearch: InputProps[] = [
    {
      label: t('Module'),
      type: TYPE_FIELD.SELECT,
      name: 'moduleId',
      className: 'w-100',
      options: transformToOptions(modules?.data || [], 'moduleName', 'id'),
      value: filter.moduleId,
      allowClear: false,
      onChange: (value: number) => setFilter({ moduleId: value }),
    },
  ];
  useEffect(() => {
    if (modules?.data && modules.data.length > 0) {
      setFilter({ moduleId: modules?.data[0].id });
    }
  }, [modules]);

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields inputs={inputSearch} span={{ sm: 24, md: 12 }} />
          </Row>
        </Card>
        <MatrixAuthorizationTable moduleId={filter.moduleId} />
      </Space>
    </>
  );
};

export default MatrixAuthorization;
