import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  appointmentReception,
  healthContract,
  healthContractOrganization,
  receptionRoute,
} from 'src/routes/routes.contants';

import HealthContract from './healthContract';
import HealthContractOrganization from './healthContractOrganization';

const Appointment = lazy(() => import('src/pages/reception/Appointment'));

const ReceptionRoutes = {
  path: receptionRoute,
  name: 'receptionRoute',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: appointmentReception,
      element: <Appointment />,
      route: PrivateRoute,
    },
    {
      path: healthContract,
      element: <HealthContract />,
      route: PrivateRoute,
    },
    {
      path: healthContractOrganization,
      element: <HealthContractOrganization />,
      route: PrivateRoute,
    },
  ],
};
export default ReceptionRoutes;
