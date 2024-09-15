import { lazy } from 'react';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  adminRoute,
  outpatientAdmissionRoute,
  // cardRenewalRoute,
  registrationRoute,
} from 'src/routes/routes.contants';

const Registration = lazy(
  () => import('src/pages/registration/OutpatientAdmission/registration/index'),
);
const OutRegistration = lazy(
  () =>
    import(
      'src/pages/registration/OutpatientAdmission/AcceptedOuputpatient/index'
    ),
);

const RegistrationRoute = {
  path: adminRoute,
  name: 'medicineStoreRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: registrationRoute,
      element: <Registration />,
      route: PrivateRoute,
    },
    {
      path: outpatientAdmissionRoute,
      element: <OutRegistration />,
      route: PrivateRoute,
    },
  ],
};
export default RegistrationRoute;
