import { useEffect } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { TUserLoginPayload } from 'src/constants/types';
import { authentication } from 'src/helpers/auth';
import { AuthState } from 'src/redux/reducers';
import * as yup from 'yup';

// components
import { FormInput, VerticalForm } from '../../components/form/';
import SocialLinks from '../../components/SocialLinks';
// hooks
import { useRedux } from '../../hooks/';
// actions
import { loginUser, logoutUser, resetAuth } from '../../redux/actions';

import AuthLayout from './AuthLayout';

// interface LocationState {
//   from?: Location;
// }

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();
  const { dispatch } = useRedux();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <Row className='mt-3'>
      <Col xs={12} className='text-center'>
        <p className='text-muted'>
          <Link to='/auth/forget-password' className='text-muted ms-1'>
            {t('Forgot_password')}
          </Link>
        </p>
        <p className='text-muted'>
          {t('not_have_an_account')}{' '}
          <Link to={'/auth/register'} className='text-primary fw-bold ms-1'>
            {t('Sign_Up')}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const { dispatch, appSelector } = useRedux();
  const { loading, error } = appSelector(AuthState);
  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t('Please_enter_Email')),
      password: yup.string().required(t('Please_enter_Password')),
    }),
  );

  /*
    handle form submission
    */
  const onSubmit = (formData: TUserLoginPayload) => {
    dispatch(loginUser(formData['username'], formData['password']));
  };

  const location = useLocation();
  const redirectUrl =
    location.state && location.state.from
      ? location.state.from.pathname
      : location.search
        ? location.search.slice(6)
        : '/';

  return (
    <>
      {authentication.isForceChangePassword() &&
        !authentication.isScreenLocked() && (
          <Navigate to={'/auth/update-password'} replace></Navigate>
        )}
      {!authentication.isForceChangePassword() &&
        !authentication.isScreenLocked() &&
        authentication.isUserAuthenticated() && (
          <Navigate to={redirectUrl} replace></Navigate>
        )}

      <AuthLayout
        helpText={t('Email_admin_or_user')}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant='danger' className='my-2'>
            {error}
          </Alert>
        )}

        <VerticalForm<TUserLoginPayload>
          onSubmit={onSubmit}
          resolver={schemaResolver}
        >
          <FormInput
            type='username'
            name='username'
            label={t('Account')}
            placeholder={t('Enter_your_username')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('Password')}
            type='password'
            name='password'
            placeholder={t('Enter_your_password')}
            containerClass={'mb-2'}
          ></FormInput>

          <FormInput
            type='checkbox'
            name='checkbox'
            label={t('Remember_me')}
            containerClass={'mb-3'}
            defaultChecked
          />

          <div className='text-center d-grid'>
            <Button variant='primary' type='submit' disabled={loading}>
              {t('Login')}
            </Button>
          </div>
        </VerticalForm>
        <h5 className='mt-3 text-muted'></h5>
      </AuthLayout>
    </>
  );
};

export default Login;
