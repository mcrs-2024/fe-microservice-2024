import { lazy } from 'react';
import Country from 'src/pages/category/Country';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
  categoryAdmissionAreaCode,
  categoryAdmissionDeskCode,
  categoryAdmissionReasonCode,
  categoryAdmissionShiftCode,
  categoryCountry,
  categoryHisRoute,
  categoryInsuranceDetailCode,
  categoryPatientSubject,
  categoryPriority,
  categoryReceivingSource,
  categoryRelativeCode,
  categoryvatInfo,
} from 'src/routes/routes.contants';

import AdmissionAreaCode from './AdmissionAreaCode';
import AdmissionDeskCode from './AdmissionDeskCode';
import AdmissionReasonCode from './AdmissionReasonCode';
import AdmissionShiftCode from './AdmissionShiftCode';
import InsuranceDetail from './InsuranceDetailCode';
import PatientSubject from './PatientSubject';
import Priority from './Priority';
import ReceivingSource from './ReceivingSource';
import RelativeCode from './RelativeCode';
import VatInfo from './VatInfo';

const hisRoutes = {
  path: categoryHisRoute,
  name: 'hisRoutes',
  route: PrivateRoute,
  roles: ['ADMIN'],
  children: [
    {
      path: categoryPriority,
      element: <Priority />,
      route: PrivateRoute,
    },
    {
      path: categoryReceivingSource,
      element: <ReceivingSource />,
      route: PrivateRoute,
    },
    {
      path: categoryvatInfo,
      element: <VatInfo />,
      route: PrivateRoute,
    },
    {
      path: categoryRelativeCode,
      element: <RelativeCode />,
      route: PrivateRoute,
    },
    {
      path: categoryInsuranceDetailCode,
      element: <InsuranceDetail />,
      route: PrivateRoute,
    },
    {
      path: categoryAdmissionReasonCode,
      element: <AdmissionReasonCode />,
      route: PrivateRoute,
    },
    {
      path: categoryAdmissionAreaCode,
      element: <AdmissionAreaCode />,
      route: PrivateRoute,
    },
    {
      path: categoryAdmissionDeskCode,
      element: <AdmissionDeskCode />,
      route: PrivateRoute,
    },
    {
      path: categoryAdmissionShiftCode,
      element: <AdmissionShiftCode />,
      route: PrivateRoute,
    },
    {
      path: categoryPatientSubject,
      element: <PatientSubject />,
      route: PrivateRoute,
    },
    {
      path: categoryCountry,
      element: <Country />,
      route: PrivateRoute,
    },
  ],
};
export default hisRoutes;
