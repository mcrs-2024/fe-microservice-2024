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
  PatientSubjectModalType,
  TPatientSubject,
} from 'src/constants/types/his/category/patientSubject';
import patientSubjectApi from 'src/helpers/api/his/category/patientSubject';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PatientSubjectModalType;
  selectedRecord: TPatientSubject | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TPatientSubject = {
  id: null,
  patientSubjectsCode: '',
  patientSubjectsName: '',
  type: '',
  seqNum: null,
};

const PatientSubjectModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    patientSubjectsCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    patientSubjectsName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TPatientSubject>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPatientSubject) => {
      try {
        if (modalType === 'add') {
          const res = await patientSubjectApi.createPatientSubject(data);
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
          const res = await patientSubjectApi.updatePatientSubject(data);
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

  const handleChange = (key: keyof TPatientSubject, value: any) => {
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
      label: t('Entity_Codes'),
      name: 'patientSubjectsCode',
      key: 'patientSubjectsCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientSubjectsCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientSubjectsCode', e.target.value);
      },
    },
    {
      label: t('Entity_Name'),
      name: 'patientSubjectsName',
      key: 'patientSubjectsName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.patientSubjectsName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('patientSubjectsName', e.target.value);
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
              ? t('Add_Entity')
              : modalType === 'edit'
                ? t('Edit_Entity')
                : t('View_Entity')}
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

export default PatientSubjectModal;
