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
import SocialLinks from '../../components/SocialLinks';
// hooks
import { useRedux } from '../../hooks/';
//actions
import { resetAuth, signupUser } from '../../redux/actions';

import AuthLayout from './AuthLayout';

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className='mt-3'>
      <Col xs={12} className='text-center'>
        <p className='text-muted'>
          {t('Already_account')}{' '}
          <Link to={'/auth/login'} className='text-primary fw--medium ms-1'>
            {t('Login')}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Register = () => {
  const { t } = useTranslation();
  const { dispatch, appSelector } = useRedux();

  const { loading, userSignUp, error } = appSelector(AuthState);

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      fullname: yup.string().required(t('Please_enter_Fullname')),
      email: yup
        .string()
        .required(t('Please_enter_Email'))
        .email('Please enter valid Email'),
      password: yup.string().required(t('Please_enter_Password')),
      checkboxsignup: yup
        .bool()
        .oneOf([true], t('Must_accept_Terms_and_Conditions')),
    }),
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: TUserSignUpPayload) => {
    dispatch(signupUser(formData));
  };

  return (
    <>
      {userSignUp ? <Navigate to={'/auth/confirm'}></Navigate> : null}

      <AuthLayout helpText={t('no_acount')} bottomLinks={<BottomLink />}>
        {error && (
          <Alert variant='danger' className='my-2'>
            {error}
          </Alert>
        )}

        <VerticalForm<TUserSignUpPayload>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{}}
        >
          <FormInput
            label={t('Full_Name')}
            type='text'
            name='fullname'
            placeholder={t('Enter_your_name')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('Username')}
            type='text'
            name='username'
            placeholder={t('Enter_your_name')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('Email address')}
            type='email'
            name='email'
            placeholder={t('Enter_your_email')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('Password')}
            type='password'
            name='password'
            placeholder={t('Enter_your_password')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('Phone_number')}
            type='text'
            name='phoneNumber'
            placeholder={t('Enter_your_phone_number')}
            containerClass={'mb-2'}
          />
          <FormInput
            label={t('I_accept_Terms_and_Conditions')}
            type='checkbox'
            name='checkboxsignup'
            containerClass={'mb-3'}
          />

          <div className='text-center d-grid'>
            <Button type='submit' disabled={loading}>
              {t('Sign_Up')}
            </Button>
          </div>
        </VerticalForm>

        <h5 className='mt-3 text-muted'></h5>
      </AuthLayout>
    </>
  );
};

export default Register;
