// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Flex,
  message,
  Modal,
  Space,
  Typography,
  UploadFile,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { POSITION_OPTIONS } from 'src/constants/dumb/admin';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TOption, TUser, UserModalType } from 'src/constants/types';
import { TRole } from 'src/constants/types/admin/role';
import { useGetAllRoles } from 'src/helpers/api/admin/role';
import userApi from 'src/helpers/api/admin/user';
import { getDataURI } from 'src/utils/image';
import { isPhoneNumber, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMemberProps {
  show: boolean;
  modalType: UserModalType;
  user: TUser | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      fullName: string;
      email: string;
      username: string;
      phoneNumber: string | null;
      avatar: string | null;
      dateOfBirth: string | null;
      // branchId: number | null;
      // genderId: number | null;
      positionId: number | null;
      roles: string[] | null;

      addressDistrict: string | null;
      addressProvince: string | null;
      addressStreet: string | null;
      addressWard: string | null;
      id?: string | null;
      status?: number | null;
      userNumber: string | null;
    }
  | TUser;

const defaultValue: FormValues = {
  fullName: '',
  email: '',
  username: '',
  phoneNumber: '',
  avatar: '',
  dateOfBirth: null,
  positionId: null,
  roles: [],

  addressDistrict: null,
  addressProvince: null,
  addressStreet: null,
  addressWard: null,
  userNumber: null,
  // branchId: null,
  // genderId: 2,
};

const UserModal = ({
  show,
  modalType,
  onHide,
  user,
  onSuccess,
}: AddMemberProps) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: roles } = useGetAllRoles();

  const formSchema = yupObject({
    username: Yup.string()
      .required(t('Please_enter_username'))
      .min(5, t('Too_short'))
      .max(35, t('Too_long'))
      .nullable(),
    fullName: Yup.string()
      .required(t('Please_enter_fullName'))
      .min(6, t('Too_short'))
      .max(50, t('Too_long'))
      .nullable(),
    email: Yup.string()
      .required(t('Please_enter_email'))
      .email(t('Please_enter_valid_email'))
      .nullable(),
    phoneNumber: Yup.string()
      .required(t('Please_enter_phone_number'))
      .matches(/^[0-9]+$/, t('Must_be_only_digits_and_10_characters'))
      .min(10, t('Too_short'))
      .max(10, t('Too_long'))
      .nullable(),
    // avatar: Yup.string().required('Please upload your avatar').nullable(),
    // dateOfBirth: Yup.string()
    //   .required(t('Please_enter_day_of_birth'))
    //   .nullable(),
    // branchId: Yup.number().required('Please enter branch').nullable(),
    positionId: Yup.number().required(t('Please_enter_position')).nullable(),
    // genderId: Yup.number().required('Please enter gender').nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      console.log('data:', data);
      try {
        if (modalType === 'edit' && user) {
          const res = await userApi.updateUser(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await userApi.createUser(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        }
      } catch (error) {
        message.error(error);
      }
    },
  });
  const handleChange = (key: keyof FormValues, value: any) => {
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
      name: 'username',
      key: 'username',
      label: t('Username'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.username,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('username', e.target.value);
      },
    },
    {
      name: 'email',
      key: 'email',
      label: t('Email'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('email', e.target.value);
      },
    },
    {
      name: 'fullName',
      key: 'fullName',
      label: t('Full_Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.fullName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fullName', e.target.value);
      },
    },
    {
      name: 'avatar',
      key: 'avatar',
      label: t('Avatar'),
      type: TYPE_FIELD.FILE,
      disabled: isDisable,
      value: formControl.values.avatar,
      fileSize: 4,
      accept: 'image/*',
      onChange: async (files: UploadFile[]) => {
        const dataURI = await getDataURI(files[0]?.originFileObj as RcFile);
        handleChange('avatar', dataURI);
      },
      maxCount: 1,
    },
    {
      name: 'phoneNumber',
      key: 'phoneNumber',
      label: t('Phone_number'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.phoneNumber,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('phoneNumber', e.target.value);
      },
    },

    {
      name: 'dateOfBirth',
      key: 'dateOfBirth',
      label: t('Day_of_Birth'),
      type: TYPE_FIELD.DATE_PICKER,
      disabled: isDisable,
      value: formControl.values.dateOfBirth,
      onChange: (_, dateString: string) => {
        handleChange('dateOfBirth', dateString);
      },
    },
    // {
    //   name: 'branchId',
    //   key: 'branchId',
    //   label: 'Branch',
    //   type: TYPE_FIELD.SELECT,
    //   placeholder: 'Select branch',
    //   options: [
    //     {
    //       value: 1,
    //       label: 'Hà Nội',
    //     },
    //     {
    //       value: 2,
    //       label: 'Hồ Chí Minh',
    //     },
    //     {
    //       value: 3,
    //       label: 'Huế',
    //     },
    //     {
    //       value: 4,
    //       label: 'Hải Phòng',
    //     },
    //   ],
    //   disabled: isDisable,
    //   value: formControl.values.branchId,
    //   onChange: (e: TOption) => {
    //     console.log(e.value);
    //     handleChange('branchId', e.value);
    //   },
    // },
    {
      name: 'positionId',
      key: 'positionId',
      label: t('Position'),
      type: TYPE_FIELD.SELECT,
      options: POSITION_OPTIONS,
      disabled: isDisable,
      value: formControl.values.positionId,
      onChange: (value: number[]) => {
        handleChange('positionId', value);
      },
    },
    // {
    //   name: 'genderId',
    //   key: 'genderId',
    //   label: 'Gender',
    //   type: TYPE_FIELD.RADIO,
    //   options: [
    //     {
    //       value: 1,
    //       label: 'Male',
    //     },
    //     {
    //       value: 2,
    //       label: 'Female',
    //     },
    //   ],
    //   disabled: isDisable,
    //   value: formControl.values.genderId,
    //   onChange: (value: number) => {
    //     handleChange('genderId', value);
    //   },
    // },
    {
      name: 'roles',
      key: 'roles',
      label: t('Roles'),
      type: TYPE_FIELD.SELECT,
      options: roles?.data.map((role: TRole) => ({
        value: role.id,
        label: role.roleName,
      })),
      disabled: isDisable,
      isMultiple: true,
      value: formControl.values.roles,
      onChange: (value: TOption) => {
        handleChange('roles', value);
      },
    },
  ];

  useEffect(() => {
    if (modalType === 'edit' && user) {
      handleResetForm();
      formControl.setValues(user);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, user]);

  return (
    <>
      <Modal
        open={modalType !== 'view' && show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add')
              : modalType === 'edit'
                ? t('Edit_user')
                : t('View_User')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
            gutter={[0, 6]}
          />

          <Flex justify='end' gap={12}>
            <Button onClick={onHide}>{t('cancel')}</Button>
            <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
              {t('Save')}
            </ButtonCustom.Edit>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default UserModal;
