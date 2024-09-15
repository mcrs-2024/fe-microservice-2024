import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  accessHistoryRoute,
  adminRoute,
  matrixAuthorizationRoute,
  systemLogsRoute,
  userAuthorizationRoute,
  userFunctionRoute,
  userRolesRoute,
  usersRoute,
} from 'src/routes/routes.contants';

const UsersList = lazy(() => import('src/pages/admin/Users'));
const UserRoles = lazy(() => import('src/pages/admin/UserRoles'));
const AccessHistory = lazy(() => import('src/pages/admin/AccessHistory'));
const SystemLogs = lazy(() => import('src/pages/admin/Logs'));
const MatrixAuthorization = lazy(
  () => import('src/pages/admin/MatrixAuthorization'),
);

const UserAuthorization = lazy(
  () => import('src/pages/admin/UserAuthorization'),
);
const UserFunction = lazy(() => import('src/pages/admin/UserFunction'));

const adminRoutes = {
  path: adminRoute,
  name: 'adminRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: usersRoute,
      element: <UsersList />,
      route: PrivateRoute,
    },
    {
      path: userRolesRoute,
      element: <UserRoles />,
      route: PrivateRoute,
    },
    {
      path: userAuthorizationRoute,
      element: <UserAuthorization />,
      route: PrivateRoute,
    },
    {
      path: userFunctionRoute,
      element: <UserFunction />,
      route: PrivateRoute,
    },

    {
      path: accessHistoryRoute,
      name: 'Lịch sử truy cập',
      element: <AccessHistory />,
      route: PrivateRoute,
    },
    {
      path: systemLogsRoute,
      name: 'Logs',
      element: <SystemLogs />,
      route: PrivateRoute,
    },
    {
      path: matrixAuthorizationRoute,
      name: 'Ma trận phân quyền',
      element: <MatrixAuthorization />,
      route: PrivateRoute,
    },
  ],
};
export default adminRoutes;
