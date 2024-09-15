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
  DiagnoseTemplateModalType,
  TDiagnoseTemplate,
} from 'src/constants/types/category/diagnoseTemplate';
import diagnoseTemplateApi from 'src/helpers/api/category/diagnoseTemplate';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: DiagnoseTemplateModalType;
  selectedRecord: TDiagnoseTemplate | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TDiagnoseTemplate = {
  id: '',
  diagnoseTemplateTitle: '',
  familyMedicalHistory: '',
  medicalHistory: '',
  allergyHistory: '',
  diseaseProgression: '',
  clinicalSummary: '',
  generalCondition: '',
  bodyParts: '',
  treated: '',
  notes: '',
  privateFlag: false,
};

const DiagnoseTemplateModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    diagnoseTemplateTitle: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    clinicalSpecialtyId: Yup.string()
      .required(t('Please_select_this_field'))
      .nullable(),
    familyMedicalHistory: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    medicalHistory: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    allergyHistory: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    diseaseProgression: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    clinicalSummary: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    generalCondition: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
    bodyParts: Yup.string().required(t('Please_enter_this_field')).nullable(),
    treated: Yup.string().required(t('Please_enter_this_field')).nullable(),
  });
  const formControl = useFormik<TDiagnoseTemplate>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TDiagnoseTemplate) => {
      try {
        if (modalType === 'add') {
          const res = await diagnoseTemplateApi.createDiagnoseTemplate(data);
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
          const res = await diagnoseTemplateApi.updateDiagnoseTemplate(data);
          if (res.data.code) {
            onSuccess();
            onHide();
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        }
      } catch (error) {
        message.error(error);
      }
    },
  });
  const handleChange = (key: keyof TDiagnoseTemplate, value: any) => {
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
      name: 'diagnoseTemplateTitle',
      key: 'diagnoseTemplateTitle',
      label: t('label'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.diagnoseTemplateTitle,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('diagnoseTemplateTitle', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Specialist'),
      type: TYPE_FIELD.SELECT,
      options: [],
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (value: string) => {
        handleChange('clinicalSpecialtyId', value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Family_Medical_History'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Medical_History'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Allergy_History'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Disease_Progression'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Clinical_Summary'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Body_Parts'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Treated'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'clinicalSpecialtyId',
      key: 'clinicalSpecialtyId',
      label: t('Notes'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.clinicalSpecialtyId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('clinicalSpecialtyId', e.target.value);
      },
    },
    {
      name: 'privateFlag',
      key: 'privateFlag',
      label: t('privateFlag'),
      type: TYPE_FIELD.CHECKBOX,
      disabled: isDisable,
      value: formControl.values.privateFlag,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('privateFlag', e.target.checked);
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
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('add_diagnosis_template')
              : modalType === 'edit'
                ? t('edit_diagnosis_template')
                : t('view_diagnosis_template')}
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

export default DiagnoseTemplateModal;
