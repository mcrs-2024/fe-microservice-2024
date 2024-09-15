import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AppointmentRescheduleModalType,
  TAppointmentReschedule,
} from 'src/constants/types/category/appointmentReschedule';
import appointmentRescheduleApi from 'src/helpers/api/category/appointmentRescheduleApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AppointmentRescheduleModalType;
  selectedRecord: TAppointmentReschedule | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAppointmentReschedule = {
  appAppointmentRescheduleReasonCode: '',
  name: '',
};

const AppointmentRescheduleModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();

  const formSchema = yupObject({
    appAppointmentRescheduleReasonCode: Yup.string().required(
      'Enter appointment reason',
    ),
    name: Yup.string().required('Enter appointment name'),
  });

  const formControl = useFormik<TAppointmentReschedule>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAppointmentReschedule) => {
      try {
        if (modalType === 'add') {
          const res =
            await appointmentRescheduleApi.createAppointmentReschedule(data);
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
          const res =
            await appointmentRescheduleApi.updateAppointmentReschedule(data);
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
  const handleChange = (key: keyof TAppointmentReschedule, value: any) => {
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
      name: 'appAppointmentRescheduleReasonCode',
      key: 'appAppointmentRescheduleReasonCode',
      label: t('appointmentRescheduleReason'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.appAppointmentRescheduleReasonCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('appAppointmentRescheduleReasonCode', e.target.value);
      },
    },
    {
      name: 'name',
      key: 'name',
      label: t('appointmentRescheduleName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.name,
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
              ? t('Add appointment reschedule')
              : modalType === 'edit'
                ? t('Edit appointment reschedule')
                : t('View appointment reschedule')}
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

export default AppointmentRescheduleModal;
