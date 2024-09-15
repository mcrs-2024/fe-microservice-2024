import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { TabsProps } from 'antd';
import PageTitle from 'src/components/PageTitle';
import TabsCustom from 'src/components/TabsCustom';
import { outpatientAdmissionRoute } from 'src/routes/routes.contants';

import ListOfPatient from './ListOfPatient';
import RegistrationOutputPatient from './RegistrationOutputpatient';

type RegistrationOutputpatientTabs =
  | 'registration-output-patient'
  | 'list-of-patient';

const Registration = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<RegistrationOutputpatientTabs>(
    (searchParams.get('tab') as RegistrationOutputpatientTabs) ||
      'registration-output-patient',
  );
  useEffect(() => {
    if (tab) setCurrentTab(tab as RegistrationOutputpatientTabs);
  }, [tab]);
  const tabItems: TabsProps['items'] = [
    {
      key: 'registration-output-patient',
      label: t('registration-output-patient'),
      children: <RegistrationOutputPatient />,
      tabKey: 'registration-output-patient',
    },
    {
      key: 'list-of-patient',
      label: t('list-of-patient'),
      children: <ListOfPatient />,
    },
    // {
    //   key: 'card-renewal-category',
    //   label: t('card-renewal-category'),
    //   children: <CardRenewal />,
    // },
    // {
    //   key: 'update-health-insurance-category',
    //   label: t('update-health-insurance-category'),
    //   children: <UpdateHealthInsurance />,
    // },
  ];
  return (
    <>
      <TabsCustom
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        items={tabItems}
        onChange={(key: string) => {
          setCurrentTab(key as RegistrationOutputpatientTabs);
          setSearchParams({ tab: key });
        }}
      />
    </>
  );
};

export default Registration;
