import React, { useEffect } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthState } from 'src/redux/reducers';
import * as yup from 'yup';

// components
import { FormInput, VerticalForm } from '../../components/form/';
// hooks
import { useRedux } from '../../hooks/';
//actions
import { forgotPassword, resetAuth } from '../../redux/actions';

import AuthLayout from './AuthLayout';

interface IFormData {
  email: string;
}

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className='mt-3'>
      <Col className='text-center'>
        <p className='text-muted'>
          {t('Back_to')}{' '}
          <Link to={'/auth/login'} className='text-primary fw-medium ms-1'>
            {t('Login')}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ForgetPassword = () => {
  const { dispatch, appSelector } = useRedux();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } =
    appSelector(AuthState);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .required(t('Please_enter_Email'))
        .email(t('Please_enter_Email')),
    }),
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: IFormData) => {
    dispatch(forgotPassword(formData['email']));
  };

  return (
    <>
      <AuthLayout
        helpText={t('instructions_reset_password')}
        bottomLinks={<BottomLink />}
      >
        {resetPasswordSuccess && (
          <Alert variant='success'>{resetPasswordSuccess}</Alert>
        )}

        {error && !resetPasswordSuccess && (
          <Alert variant='danger' className='my-2'>
            {error}
          </Alert>
        )}

        {!passwordReset && (
          <VerticalForm<IFormData>
            onSubmit={onSubmit}
            resolver={schemaResolver}
          >
            <FormInput
              label={t('Account')}
              type='email'
              name='email'
              placeholder={t('Enter_your_Account')}
              containerClass={'mb-3'}
            />

            <div className='d-grid text-center'>
              <Button type='submit' disabled={loading}>
                {t('Reset_Password')}
              </Button>
            </div>
          </VerticalForm>
        )}
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
