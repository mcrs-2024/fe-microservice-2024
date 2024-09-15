import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import { adminRoute, medicineStoreRoute } from 'src/routes/routes.contants';

const MedicineStore = lazy(() => import('src/pages/warehouse/MedicineStore'));

const medicineStoreRoutes = {
  path: adminRoute,
  name: 'medicineStoreRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: medicineStoreRoute,
      element: <MedicineStore />,
      route: PrivateRoute,
    },
  ],
};
export default medicineStoreRoutes;
