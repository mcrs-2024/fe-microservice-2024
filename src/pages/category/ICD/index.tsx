import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { TabsProps } from 'antd';
import PageTitle from 'src/components/PageTitle';
import TabsCustom from 'src/components/TabsCustom';
import { resetButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICD10 } from 'src/routes/routes.contants';

import GroupICD from './CategoryGroupICD';
import Chapter from './Chapter';
import ICD10 from './ICD10';
import TypeICD from './TypeICD';

type TICDTabs = 'ICD-10' | 'ICD-chapter' | 'ICD-block' | 'ICD-type';

const ICD = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<TICDTabs>(
    (searchParams.get('tab') as TICDTabs) || 'ICD-10',
  );
  useEffect(() => {
    if (tab) setCurrentTab(tab as TICDTabs);
  }, [tab]);

  useEffect(() => {
    // Reset buttons when component unmounts or tab changes
    return () => {
      dispatch(resetButton());
    };
  }, [currentTab, dispatch]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'ICD-10',
      label: t('ICD-10'),
      children: <ICD10 />,
      tabKey: 'ICD-10',
    },
    {
      key: 'ICD-chapter',
      label: t('ICD-chapter'),
      children: <Chapter />,
    },
    {
      key: 'ICD-block',
      label: t('ICD-block'),
      children: <GroupICD />,
    },
    {
      key: 'ICD-type',
      label: t('ICD-type'),
      children: <TypeICD />,
    },
  ];

  return (
    <>
      <TabsCustom
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        items={tabItems}
        onChange={(key: string) => {
          setCurrentTab(key as TICDTabs);
          setSearchParams({ tab: key });
          dispatch(resetButton());
        }}
      />
    </>
  );
};

export default ICD;
