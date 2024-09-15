// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { STATUS } from 'src/constants/dumb/couponForm';
import { GENDER } from 'src/constants/dumb/registration';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  OutpatientAdmissionModalType,
  TOutpatientAdmission,
} from 'src/constants/types/registration/outPatient';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: OutpatientAdmissionModalType;
  selectedRecord: TOutpatientAdmission | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TOutpatientAdmission = {
  id: null,
  patientName: null,
  patientAge: null,
  patientGender: null,
  fromDate: null,
  toDate: null,
  registrationId: null,
  status: null,
};

const RegistrationOutputPatientModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    patientName: Yup.string().required().nullable(),
    fromDate: Yup.string().required().nullable(),
    toDate: Yup.string().required().nullable(),
    registrationId: Yup.string().required().nullable(),
    status: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TOutpatientAdmission>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TOutpatientAdmission) => {
      try {
        if (modalType === 'add') {
          const res = await chapterApi.createChapter(data);
          if (res.data.code) {
            onSuccess();
            formControl.resetForm();
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
        if (modalType === 'edit') {
          const res = await chapterApi.updateChapter(data);
          if (res.data.code) {
            onSuccess();
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
  const handleChange = (key: keyof TOutpatientAdmission, value: any) => {
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
      name: 'patientName',
      key: 'patientName',
      label: t('patientName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientName', e.target.value);
      },
    },
    {
      name: 'patientAge',
      key: 'patientAge',
      label: t('patientAge'),
      type: TYPE_FIELD.INPUT_NUMBER,
      value: formControl.values.patientAge,
      onChange: (value: number) => {
        handleChange('patientAge', value);
      },
    },
    {
      name: 'patientGender',
      key: 'patientGender',
      label: t('patientGender'),
      type: TYPE_FIELD.SELECT,
      options: GENDER,
      value: formControl.values.patientGender,
      onChange: (value: number) => {
        handleChange('patientGender', value);
      },
    },
    {
      name: 'fromDate',
      key: 'fromDate',
      label: t('fromDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.fromDate,
      onChange: (_, dateString: string) => {
        handleChange('fromDate', dateString);
      },
    },
    {
      name: 'toDate',
      key: 'toDate',
      label: t('toDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.toDate,
      onChange: (_, dateString: string) => {
        handleChange('toDate', dateString);
      },
    },
    {
      name: 'registrationId',
      key: 'registrationId',
      label: t('registrationId'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.registrationId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('registrationId', e.target.value);
      },
    },
    {
      name: 'statusPatient',
      key: 'statusPatient',
      label: t('status'),
      type: TYPE_FIELD.SELECT,
      options: STATUS,
      value: formControl.values.status,
      onChange: (value: number) => {
        handleChange('status', value);
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
              ? t('Add_registration_output_patient')
              : modalType === 'edit'
                ? t('Edit_registration_output_patient')
                : t('View_registration_output_patient')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical' className='w-100'>
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

export default RegistrationOutputPatientModal;
