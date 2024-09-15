import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, message, Row } from 'antd';
import { useFormik } from 'formik';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import userApi from 'src/helpers/api/admin/user';
import { AuthState } from 'src/redux/reducers';
import { loginRoute } from 'src/routes/routes.contants';
import { yupObject } from 'src/utils/validate';
import * as yup from 'yup';

// components
// hooks
import { useRedux } from '../../hooks/';
//actions
import { logoutUser } from '../../redux/actions';

import AuthLayout from './AuthLayout';

/* bottom links */

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
const defaultValue: FormValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
const UpdatePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch, appSelector } = useRedux();
  const { user } = appSelector(AuthState);

  const schemaResolver = yupObject({
    oldPassword: yup.string().required(t('Please enter old password')),
    newPassword: yup.string().required(t('Please enter new password')),
    confirmNewPassword: yup
      .string()
      .required(t('Please enter confirm password'))
      .oneOf([yup.ref('newPassword')], t('Password confirm not matching')),
  });

  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: schemaResolver,
    onSubmit: async (data: FormValues) => {
      if (!user) {
        dispatch(logoutUser());
        return;
      }
      try {
        const res = await userApi.changeUserPassword(
          user.id,
          data.oldPassword,
          data.newPassword,
        );
        if (res.data.code === 200) {
          message.success(res.data.message);
          handleResetForm();
          dispatch(logoutUser());
          setTimeout(() => {
            navigate(loginRoute);
          }, 500);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log('error:', error);
      }
    },
  });

  const handleChange = (key: keyof FormValues, value: string) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  const handleResetForm = () => {
    formControl.resetForm();
  };

  const inputs: InputProps[] = [
    {
      name: 'oldPassword',
      label: 'Current password',
      type: TYPE_FIELD.PASSWORD,
      size: 'large',
      value: formControl.values.oldPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('oldPassword', e.target.value);
      },
    },
    {
      name: 'newPassword',
      label: 'New password',
      type: TYPE_FIELD.PASSWORD,
      size: 'large',
      value: formControl.values.newPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('newPassword', e.target.value);
      },
    },
    {
      name: 'confirmNewPassword',
      label: 'Confirm new password',
      size: 'large',
      type: TYPE_FIELD.PASSWORD,
      value: formControl.values.confirmNewPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('confirmNewPassword', e.target.value);
      },
    },
  ];

  return (
    <>
      <AuthLayout
        helpText={t(
          t(
            'Please update your new password before continuing to use the application',
          ),
        )}
      >
        <InputFields span={{ sm: 24 }} inputs={inputs} form={formControl} />
        <Row align={'middle'} justify={'center'}>
          <Button
            type='primary'
            onClick={formControl.submitForm}
            className='mt-2'
          >
            Update password
          </Button>
        </Row>
      </AuthLayout>
    </>
  );
};

export default UpdatePassword;
