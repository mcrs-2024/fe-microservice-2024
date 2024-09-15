import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { TabsProps } from 'antd';
import PageTitle from 'src/components/PageTitle';
import TabsCustom from 'src/components/TabsCustom';
import MedicineStoreCategory from 'src/pages/warehouse/MedicineStore/Category';
import PhieuNhap from 'src/pages/warehouse/MedicineStore/Coupon';
import InventorySheet from 'src/pages/warehouse/MedicineStore/InventorySheet';
import PhieuDuTru from 'src/pages/warehouse/MedicineStore/Provisional';
import WarehouseMedicine from 'src/pages/warehouse/MedicineStore/WarehouseMedicine';
import { resetButton } from 'src/redux toolkit/buttonsSlice';
import { medicineStoreRoute } from 'src/routes/routes.contants';

type TWarehouseMedicineTabs =
  | 'warehouse-medicine'
  | 'phieu-nhap'
  | 'promissory-detail'
  | 'inventory-sheet'
  | 'inventory-details'
  | 'phieu-du-tru'
  | 'medicine-config';

const MedicineStore = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<TWarehouseMedicineTabs>(
    (searchParams.get('tab') as TWarehouseMedicineTabs) || 'warehouse-medicine',
  );

  useEffect(() => {
    if (tab) setCurrentTab(tab as TWarehouseMedicineTabs);
  }, [tab]);
  useEffect(() => {
    return () => {
      dispatch(resetButton());
    };
  }, [currentTab, dispatch]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'warehouse-medicine',
      label: t('Warehouse Medicine List'),
      children: <WarehouseMedicine />,
      tabKey: 'warehouse-medicine',
    },
    {
      key: 'phieu-nhap',
      label: t('Input Form'),
      children: <PhieuNhap />,
    },
    // {
    //   key: 'promissory-detail',
    //   label: t('Form Details'),
    //   children: <PromissoryDetail />,
    // },
    {
      key: 'inventory-sheet',
      label: t('Inventory Form'),
      children: <InventorySheet />,
    },
    // {
    //   key: 'inventory-details',
    //   label: t('Inventory Details'),
    //   children: <InventoryDetails />,
    // },
    {
      key: 'phieu-du-tru',
      label: t('Provisional Form'),
      children: <PhieuDuTru />,
    },
    {
      key: 'medicine-config',
      label: t('System Configuration'),
      children: <MedicineStoreCategory />,
    },
  ];
  return (
    <>
      <TabsCustom
        defaultActiveKey={currentTab}
        activeKey={currentTab}
        items={tabItems}
        onChange={(key: string) => {
          setCurrentTab(key as TWarehouseMedicineTabs);
          setSearchParams({ tab: key });
          dispatch(resetButton());
        }}
      />
    </>
  );
};

export default MedicineStore;
