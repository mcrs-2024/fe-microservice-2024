import React, { useEffect } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { TUserSignUpPayload } from 'src/constants/types';
import { AuthState } from 'src/redux/reducers';
import * as yup from 'yup';

// components
import { FormInput, VerticalForm } from '../../components/form/';
// hooks
import { useRedux } from '../../hooks/';
// actions
import { loginUser, resetAuth, signupUser } from '../../redux/actions';

import AuthLayout from './AuthLayout';

interface TLoginSignUpType {
  loginpassword: string;
  password: string;
  fullname: string;
  email: string;
  email2: string;
}

const SignInSignUp = () => {
  const { t } = useTranslation();
  const { dispatch, appSelector } = useRedux();

  const { user, userSignUp, loading, error } = appSelector(AuthState);

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
    form validation schema
    */
  const loginSchema = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .required(t('Please_enter_Email'))
        .email(t('Please_enter_valid_Email')),
      loginpassword: yup.string().required(t('Please_enter_Password')),
    }),
  );

  const signUpSchema = yupResolver(
    yup.object().shape({
      password: yup.string().required(t('Please_enter_Password')),
      fullname: yup.string().required(t('Please_enter_Fullname')),
      email2: yup
        .string()
        .required(t('Please_enter_Email'))
        .email(t('Please_enter_valid_Email')),
    }),
  );

  /*
    handle form submission
    */
  const onSubmit = (formData: TLoginSignUpType) => {
    dispatch(loginUser(formData['email'], formData['loginpassword']));
  };

  const onSignUp = (formData: TLoginSignUpType) => {
    dispatch(
      signupUser({
        email: formData['email2'],
        fullname: formData['fullname'],
        password: formData['password'],
      } as TUserSignUpPayload),
    );
  };

  return (
    <>
      {user ? <Navigate to='/'></Navigate> : null}

      {userSignUp ? <Navigate to={'/auth/confirm'}></Navigate> : null}

      <AuthLayout isCombineForm={true}>
        <Row className='mt-4'>
          <Col lg={6}>
            <div className='p-sm-3'>
              <h4 className='mt-0'>{t('Login')}</h4>
              <p className='text-muted mb-4'>
                {t('Enter your email address and password to access account.')}
              </p>
              {error && (
                <Alert variant='danger' className='my-2'>
                  {error}
                </Alert>
              )}
              <VerticalForm<TLoginSignUpType>
                onSubmit={onSubmit}
                resolver={loginSchema}
                defaultValues={{
                  email: 'minton@coderthemes.com',
                  loginpassword: 'test',
                }}
              >
                <FormInput
                  type='email'
                  name='email'
                  label={t('Email address')}
                  placeholder={t('hello@coderthemes.com')}
                  containerClass={'mb-3'}
                />
                <FormInput
                  label='Password'
                  type='password'
                  name='loginpassword'
                  placeholder={t('Enter_your_password')}
                  containerClass={'mb-3'}
                >
                  <Link
                    to='/auth/forget-password'
                    className='text-muted float-end'
                  >
                    <small>{t('Forgot your password?')}</small>
                  </Link>
                </FormInput>

                <div className='mb-3'>
                  <Button
                    variant='primary'
                    type='submit'
                    className='btn btn-primary float-sm-end'
                    disabled={loading}
                  >
                    {t('Log In')}
                  </Button>
                  <FormInput
                    label='Remember me'
                    type='checkbox'
                    name='checkbox'
                  />
                </div>
              </VerticalForm>
            </div>
          </Col>

          <Col lg={6}>
            <div className='p-sm-3'>
              <h4 className='mt-0'>{t('Free Sign Up')}</h4>
              <p className='text-muted mb-4'>{t('no_acount')}</p>

              <VerticalForm<TLoginSignUpType>
                onSubmit={onSignUp}
                resolver={signUpSchema}
                defaultValues={{}}
              >
                <FormInput
                  label={t('Full_Name')}
                  type='text'
                  name='fullname'
                  placeholder={t('Enter your name')}
                  containerClass={'mb-3'}
                />
                <FormInput
                  label={t('Email address')}
                  type='email'
                  name='email2'
                  placeholder={t('Enter_your_email')}
                  containerClass={'mb-3'}
                />
                <FormInput
                  label={t('Password')}
                  type='password'
                  name='password'
                  placeholder={t('Enter_your_password')}
                  containerClass={'mb-3'}
                />

                <div className='mb-0'>
                  <Button
                    variant='success'
                    type='submit'
                    className='btn btn-success float-sm-end'
                    disabled={loading}
                  >
                    {t('Sign_Up')}
                  </Button>
                  <FormInput
                    label={t('Must_accept_Terms_and_Conditions')}
                    type='checkbox'
                    name='checkboxsignup'
                    containerClass={'pt-1'}
                  />
                </div>
              </VerticalForm>
            </div>
          </Col>
        </Row>
      </AuthLayout>
    </>
  );
};

export default SignInSignUp;
