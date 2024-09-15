import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { TabsProps } from 'antd';
import PageTitle from 'src/components/PageTitle';
import TabsCustom from 'src/components/TabsCustom';
import WarehouseMedicine from 'src/pages/warehouse/MedicineStore/WarehouseMedicine';
import { resetButton } from 'src/redux toolkit/buttonsSlice';
import { medicineStoreRoute } from 'src/routes/routes.contants';

import WarehouseSupplierCategory from './Category';
import Coupon from './Coupon';
import Export from './Export';
import InventoryDetails from './InventoryDetails';
import InventorySheet from './InventorySheet';
import MaterialsWarehouse from './MaterialsWarehouse';
import PhieuDuTru from './Provisional';

type TWarehouseMedicineTabs =
  | 'materials-Warehouse'
  | 'coupon'
  | 'promissory-detail'
  | 'inventory-sheet'
  | 'inventory-details'
  | 'phieu-du-tru'
  | 'medicine-config';

const MedicalSupplies = () => {
  const { t } = useTranslation();
  const { tab } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<TWarehouseMedicineTabs>(
    (searchParams.get('tab') as TWarehouseMedicineTabs) ||
      'materials-Warehouse',
  );
  useEffect(() => {
    if (tab) setCurrentTab(tab as TWarehouseMedicineTabs);
  }, [tab]);
  useEffect(() => {
    // Reset buttons when component unmounts or tab changes
    return () => {
      dispatch(resetButton());
    };
  }, [currentTab, dispatch]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'materials-Warehouse',
      label: t('supplies_warehouse'),
      children: <MaterialsWarehouse />,
      tabKey: 'materials-Warehouse',
    },
    {
      key: 'coupon',
      label: t('Input Form'),
      children: <Coupon />,
    },
    {
      key: 'exportform',
      label: t('exportform'),
      children: <Export />,
    },
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
      key: 'warehouseSupplier',
      label: t('warehouseSupplier'),
      children: <WarehouseSupplierCategory />,
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

export default MedicalSupplies;
