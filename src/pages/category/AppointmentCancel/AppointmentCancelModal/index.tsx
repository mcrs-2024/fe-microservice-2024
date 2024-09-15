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
  AppointmentCancelModalType,
  TAppointmentCancel,
} from 'src/constants/types/category/appointmentCancel';
import appointmentCancelApi from 'src/helpers/api/category/appointmentCancelApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AppointmentCancelModalType;
  selectedRecord: TAppointmentCancel | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAppointmentCancel = {
  appAppointmentCancelReasonCode: '',
  name: '',
};

const AppointmentCancelModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    appAppointmentCancelReasonCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(15, t('Too_long_maximum_20_characters')),

    name: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters')),
  });
  const formControl = useFormik<TAppointmentCancel>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAppointmentCancel) => {
      try {
        if (modalType === 'add') {
          const res = await appointmentCancelApi.createAppointmentCancel(data);
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
          const res = await appointmentCancelApi.updateAppointmentCancel(data);
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
  const handleChange = (key: keyof TAppointmentCancel, value: any) => {
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
      name: 'appAppointmentCancelReasonCode',
      key: 'appAppointmentCancelReasonCode',
      label: t('Reason_record'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.appAppointmentCancelReasonCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('appAppointmentCancelReasonCode', e.target.value);
      },
    },
    {
      name: 'name',
      key: 'name',
      label: t('Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('name', e.target.value);
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
              ? t('Add_reason_record')
              : modalType === 'edit'
                ? t('Edit_reason_record')
                : t('View_reason_record')}
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

export default AppointmentCancelModal;
