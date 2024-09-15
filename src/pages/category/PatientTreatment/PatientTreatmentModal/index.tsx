// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PATIENT_TREATMENT_STATUS } from 'src/constants/enums/patientTreatment';
import {
  PatientTreatmentModalType,
  TPatientTreatment,
} from 'src/constants/types/category/patientTreatment';
import patientTreatmentApi from 'src/helpers/api/category/patientTreatment';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PatientTreatmentModalType;
  selectedRecord: TPatientTreatment | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TPatientTreatment = {
  id: null,
  patientTreatmentTemplateCode: '',
  patientTreatmentTemplateName: '',
  progression: '',
  treatment: '',
};
const PATIENT_TREATMENT_STATUS_OPTIONS = [
  { label: 'Có ', value: 'true' }, // Convert boolean to string
  { label: 'Không', value: 'false' },
];
const PatientTreatmentModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    patientTreatmentTemplateName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
    progression: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
    treatment: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TPatientTreatment>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPatientTreatment) => {
      try {
        if (modalType === 'add') {
          const res = await patientTreatmentApi.createPatientTreatment(data);
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
          const res = await patientTreatmentApi.updatePatientTreatment(data);
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
  const handleChange = (key: keyof TPatientTreatment, value: any) => {
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
      name: 'patientTreatmentTemplateCode',
      key: 'patientTreatmentTemplateCode',
      label: t('patientTreatmentTemplateCode'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.patientTreatmentTemplateCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientTreatmentTemplateCode', e.target.value);
      },
    },
    {
      name: 'patientTreatmentTemplateName',
      key: 'patientTreatmentTemplateName',
      label: t('patientTreatmentTemplateName'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.patientTreatmentTemplateName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientTreatmentTemplateName', e.target.value);
      },
    },
    {
      name: 'progression',
      key: 'progression',
      label: t('progression'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.progression,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('progression', e.target.value);
      },
    },

    {
      name: 'treatment',
      key: 'treatment',
      label: t('treatment'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.treatment,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('treatment', e.target.value);
      },
    },
    {
      name: 'privateFlag',
      key: 'privateFlag',
      label: t('privateFlag'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.privateFlag?.toString(),
      options: PATIENT_TREATMENT_STATUS_OPTIONS,
      onChange: (value: boolean) => {
        handleChange('privateFlag', value);
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
              ? t('Add_template_change')
              : modalType === 'edit'
                ? t('Edit_template_change')
                : t('View_template_change')}
          </Typography.Title>
        }
        footer
        width={600}
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

export default PatientTreatmentModal;
