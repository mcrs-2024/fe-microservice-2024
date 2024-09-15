// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AppointmentMethodModalType,
  TAppointmentMethod,
} from 'src/constants/types/category/appointmentMethod';
import appointmentMethodApi from 'src/helpers/api/category/appointmentMethod';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AppointmentMethodModalType;
  selectedRecord: TAppointmentMethod | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues =
  | {
      id: '';
      appAppointmentMethodName: '';
      appAppointmentMethodDescription: '';
      createdDate: '';
      modifiedDate: '';
      createdBy: '';
      modifiedBy: '';
    }
  | TAppointmentMethod;

const defaultValue: FormValues = {
  id: '',
  appAppointmentMethodName: '',
  appAppointmentMethodDescription: '',
  createdDate: '',
  modifiedDate: '',
  createdBy: '',
  modifiedBy: '',
};

const AppointMentMethodModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    appAppointmentMethodName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
  });
  const formControl = useFormik<TAppointmentMethod>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAppointmentMethod) => {
      try {
        if (modalType === 'add') {
          const res = await appointmentMethodApi.createAppointmentMethod(data);
          if (res.data.code) {
            onSuccess();
            onHide();
            formControl.resetForm();
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
        if (modalType === 'edit') {
          const res = await appointmentMethodApi.updateAppointmentMethod(data);
          if (res.data.code) {
            onSuccess();
            onHide();

            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
        onHide();
      } catch (error) {
        message.error(error);
      }
    },
  });
  const handleChange = (key: keyof TAppointmentMethod, value: any) => {
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
      name: 'appAppointmentMethodName',
      key: 'appAppointmentMethodName',
      label: t('Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.appAppointmentMethodName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('appAppointmentMethodName', e.target.value);
      },
    },
    {
      name: 'appAppointmentMethodDescription',
      key: 'appAppointmentMethodDescription',
      label: t('description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.appAppointmentMethodDescription,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('appAppointmentMethodDescription', e.target.value);
      },
    },
  ];

  useEffect(() => {
    if (modalType === 'edit' && selectedRecord) {
      handleResetForm();
      formControl.setValues(selectedRecord);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, selectedRecord]);

  return (
    <>
      <Modal
        open={modalType !== 'view' && isShow}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_appointment_method')
              : modalType === 'edit'
                ? t('Edit_appointment_method')
                : t('View_appointment_method')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical' className='w-100'>
          <InputFields inputs={inputs} form={formControl} span={{ sm: 24 }} />

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

export default AppointMentMethodModal;
