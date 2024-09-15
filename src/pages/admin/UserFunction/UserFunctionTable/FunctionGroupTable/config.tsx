import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';

type FunctionTableType = {
  key?: React.Key;
  functionCode: number | null;
  functionName: string | null;
  children?: Array<FunctionTableType>;
};

export type { FunctionTableType };

export const useColumns = (): ColumnsType<any> => {
  const { t } = useTranslation();

  return [
    {
      key: 1,
      dataIndex: 'url',
      title: t('Function_code'),
    },
    {
      key: 2,
      dataIndex: 'label',
      title: t('Function_name'),
    },
  ];
};
