import React from 'react';
import { Route } from 'react-router-dom';

const Maintenance = React.lazy(() => import('src/pages/other/Maintenance'));
const CommingSoon = React.lazy(() => import('src/pages/other/CommingSoon'));

const otherPublicRoutes = [
  {
    path: '/maintenance',
    name: 'Maintenance',
    element: <Maintenance />,
    route: Route,
  },
  {
    path: '/comming-soon',
    name: 'Coming Soon',
    element: <CommingSoon />,
    route: Route,
  },
];
export default otherPublicRoutes;
