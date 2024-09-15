import { Space } from 'antd';

import ContractorCategory from './ContractorCategory';
import HoatChatCategory from './HoatChatCategory';
import MedicineCategory from './MedicineCategory';
import MedicineGroupCategory from './MedicineGroupCategory';
import MedicineTypeCategory from './MedicineTypeCategory';
import SupplierCategory from './SupplierCategory';
import WarehouseMedicineCategory from './WarehouseMedicineCategory';

const MedicineStoreCategory = () => {
  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <WarehouseMedicineCategory />
        <MedicineCategory />
        <MedicineTypeCategory />
        <MedicineGroupCategory />
        <HoatChatCategory />
        <SupplierCategory />
        <ContractorCategory />
      </Space>
    </>
  );
};

export default MedicineStoreCategory;
