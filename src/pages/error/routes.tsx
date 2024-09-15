import React from 'react';
import { Route } from 'react-router-dom';

const Error404 = React.lazy(() => import('src/pages/error/Error404'));
const Error500 = React.lazy(() => import('src/pages/error/Error500'));

// public routes
const errorRoutes = [
  {
    path: '/error-404',
    name: 'Error - 404',
    element: <Error404 />,
    route: Route,
  },
  {
    path: '/error-500',
    name: 'Error - 500',
    element: <Error500 />,
    route: Route,
  },
];
export default errorRoutes;
