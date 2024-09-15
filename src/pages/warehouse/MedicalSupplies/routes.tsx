import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  adminRoute,
  medicalSuppliesStoreRoute,
} from 'src/routes/routes.contants';

const MedicalSupplies = lazy(
  () => import('src/pages/warehouse/MedicalSupplies'),
);

const medicalSuppliesRoutes = {
  path: adminRoute,
  name: 'medicineStoreRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: medicalSuppliesStoreRoute,
      element: <MedicalSupplies />,
      route: PrivateRoute,
    },
  ],
};
export default medicalSuppliesRoutes;
