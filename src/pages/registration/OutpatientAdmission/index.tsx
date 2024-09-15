import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { PayCircleOutlined } from '@ant-design/icons';
import { TabsProps } from 'antd';
import PageTitle from 'src/components/PageTitle';
import TabsCustom from 'src/components/TabsCustom';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import WarehouseMedicine from 'src/pages/warehouse/MedicineStore/WarehouseMedicine';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { medicineStoreRoute } from 'src/routes/routes.contants';

import AcceptSession from './AcceptedOuputpatient/RegistrationOutputpatient';
import CardRenewal from './cardRenewal';
import RegistrationCategory from './registration';
import UpdateHealthInsurance from './updateHealthInsurance';

type TRegistrationTabs =
  | 'accepted-category'
  | 'card-renewal-category'
  | 'registration-category'
  | 'update-health-insurance-category';

const Registration = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<TRegistrationTabs>(
    (searchParams.get('tab') as TRegistrationTabs) || 'accepted-category',
  );
  useEffect(() => {
    if (tab) setCurrentTab(tab as TRegistrationTabs);
  }, [tab]);
  const tabItems: TabsProps['items'] = [
    {
      key: 'accepted-category',
      label: t('accepted-category'),
      children: <AcceptSession />,
      tabKey: 'accepted-category',
    },
    {
      key: 'registration-category',
      label: t('registration-category'),
      children: <RegistrationCategory />,
    },
    {
      key: 'card-renewal-category',
      label: t('card-renewal-category'),
      children: <CardRenewal />,
    },
    {
      key: 'update-health-insurance-category',
      label: t('update-health-insurance-category'),
      children: <UpdateHealthInsurance />,
    },
  ];
  useEffect(() => {
    dispatch(
      addButton({
        action: PERMISSION_CODES.CREATE,
        id: 'addButton',
        className: 'btn-sub',
        type: 'primary',
        icon: <PayCircleOutlined />,
        children: 'Thanh toán',
      }),
    );
  }, [dispatch]);
  return (
    <>
      <TabsCustom
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        items={tabItems}
        onChange={(key: string) => {
          setCurrentTab(key as TRegistrationTabs);
          setSearchParams({ tab: key });
        }}
      />
    </>
  );
};

export default Registration;
