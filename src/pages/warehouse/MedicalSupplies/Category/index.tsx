import { Space } from 'antd';

import BiddingDecision from './BiddingDecision';
import Firm from './FirmCategory';
import ListOfWarehouseSupplier from './ListOfWarehouseSupplier';
import MedicalSupplies from './MedicalSupplies';
import MedicalSuppliesGroup from './MedicalSuppliesGroup';
import Regulation from './Regulation';
import Supplier from './Supplier';

const WarehouseSupplierCategory = () => {
  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <ListOfWarehouseSupplier></ListOfWarehouseSupplier>
        <Firm></Firm>
        <Supplier></Supplier>
        <MedicalSuppliesGroup></MedicalSuppliesGroup>
        <Regulation></Regulation>
        <BiddingDecision></BiddingDecision>
        <MedicalSupplies></MedicalSupplies>
      </Space>
    </>
  );
};

export default WarehouseSupplierCategory;
