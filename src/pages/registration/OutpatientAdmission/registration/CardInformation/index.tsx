import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { TabsProps } from 'antd';
import TabsCustom from 'src/components/TabsCustom';

import ApplicablePolicy from './CardDetail/ApplicablePolicy';
import Discount from './CardDetail/Discount';
import MedicalCard from './CardDetail/MedicalCard';

type TCardDetailTabs = 'applicable-policy' | 'discount' | 'medical-card';

const CardDetail = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<TCardDetailTabs>(
    (searchParams.get('tab') as TCardDetailTabs) || 'applicable-policy',
  );
  useEffect(() => {
    if (tab) setCurrentTab(tab as TCardDetailTabs);
  }, [tab]);
  const tabItems: TabsProps['items'] = [
    {
      key: 'medical-card',
      label: t('medical-card'),
      children: <MedicalCard />,
    },
    {
      key: 'applicable-policy',
      label: t('applicable-policy'),
      children: <ApplicablePolicy />,
      tabKey: 'applicable-policy',
    },
    {
      key: 'discount',
      label: t('discount'),
      children: <Discount />,
    },
  ];
  return (
    <>
      <TabsCustom
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        items={tabItems}
        onChange={(key: string) => {
          setCurrentTab(key as TCardDetailTabs);
          setSearchParams({ tab: key });
        }}
      />
    </>
  );
};

export default CardDetail;
