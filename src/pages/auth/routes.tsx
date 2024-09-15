import React from 'react';
import { Route } from 'react-router-dom';
import { RoutesProps } from 'src/routes';
import { changeUserPassword } from 'src/routes/routes.contants';

// auth
const Login = React.lazy(() => import('src/pages/auth/Login'));
const Confirm = React.lazy(() => import('src/pages/auth/Confirm'));
const ForgetPassword = React.lazy(
  () => import('src/pages/auth/ForgetPassword'),
);
const Register = React.lazy(() => import('src/pages/auth/Register'));
const SignInSignUp = React.lazy(() => import('src/pages/auth/SignInSignUp'));
const LockScreen = React.lazy(() => import('src/pages/auth/LockScreen'));
const UpdatePassword = React.lazy(
  () => import('src/pages/auth/UpdatePassword'),
);

const authRoutes: RoutesProps[] = [
  {
    path: '/auth/login',
    name: 'Login',
    element: <Login />,
    route: Route,
  },
  {
    path: '/auth/register',
    name: 'Register',
    element: <Register />,
    route: Route,
  },
  {
    path: changeUserPassword,
    name: 'UpdatePassword',
    element: <UpdatePassword />,
    route: Route,
  },
  {
    path: '/auth/confirm',
    name: 'Confirm',
    element: <Confirm />,
    route: Route,
  },
  {
    path: '/auth/forget-password',
    name: 'Forget Password',
    element: <ForgetPassword />,
    route: Route,
  },
  {
    path: '/auth/signin-signup',
    name: 'SignIn-SignUp',
    element: <SignInSignUp />,
    route: Route,
  },
  {
    path: '/auth/lock-screen',
    name: 'Lock Screen',
    element: <LockScreen />,
    route: Route,
  },
];
export default authRoutes;
