// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { CHAPTER_STATUS_OPTIONS } from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AppointmentTypesModalType,
  TAppointmentTypes,
} from 'src/constants/types/category/AppointmentTypes';
import appointmentTypeApi from 'src/helpers/api/category/appointmentTypes';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AppointmentTypesModalType;
  selectedRecord: TAppointmentTypes | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAppointmentTypes = {
  appAppointmentTypeCode: null,
  name: null,
};

const AppointmentTypesModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    appAppointmentTypeCode: Yup.string().required().nullable(),
    name: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TAppointmentTypes>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAppointmentTypes) => {
      try {
        if (modalType === 'add') {
          const res = await appointmentTypeApi.createAppointmentType(data);
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
          const res = await appointmentTypeApi.updateAppointmentType(data);
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
  const handleChange = (key: keyof TAppointmentTypes, value: any) => {
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
      name: 'appAppointmentTypeCode',
      key: 'appAppointmentTypeCode',
      label: t('Appointment_type'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.appAppointmentTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('appAppointmentTypeCode', e.target.value);
      },
    },
    {
      name: 'name',
      key: 'name',
      label: t('Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
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
              ? t('Add_appointment_type')
              : modalType === 'edit'
                ? t('Edit_appointment_type')
                : t('View_appointment_type')}
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

export default AppointmentTypesModal;
