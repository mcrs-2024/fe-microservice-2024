import { Route, RouteProps } from 'react-router-dom';
import { flattenRoutes } from 'src/helpers';
import adminRoutes from 'src/pages/admin/routes';
import authRoutes from 'src/pages/auth/routes';
import categoryRoutes from 'src/pages/category/routes';
import errorRoutes from 'src/pages/error/routes';
import categoryHisRoute from 'src/pages/his/category/routes';
import otherPublicRoutes from 'src/pages/other/routes';
import ReceptionRoutes from 'src/pages/reception/routes';
import RegistrationRoute from 'src/pages/registration/routes';
import medicalSuppliesRoutes from 'src/pages/warehouse/MedicalSupplies/routes';
import medicineStoreRoutes from 'src/pages/warehouse/MedicineStore/routes';

import Root from './Root';

export interface RoutesProps {
  path: RouteProps['path'];
  name?: string;
  element?: RouteProps['element'];
  route?: any;
  exact?: any;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
  path: '/',
  exact: true,
  name: 'Root',
  element: <Root />,
  route: Route,
};

const publicRoutes = [
  ...authRoutes,
  ...otherPublicRoutes,
  ...errorRoutes,
  rootRoute,
];
const authProtectedRoutes = [
  medicineStoreRoutes,
  medicalSuppliesRoutes,
  adminRoutes,
  categoryRoutes,
  categoryHisRoute,
  ReceptionRoutes,
  RegistrationRoute,
];

const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);

export {
  authProtectedFlattenRoutes,
  authProtectedRoutes,
  publicProtectedFlattenRoutes,
  publicRoutes,
};
