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
  AdmissionReasonCodeModalType,
  TAdmissionReasonCode,
} from 'src/constants/types/his/category/admissionReasonCode';
import admissionReasonCodeApi from 'src/helpers/api/his/category/admissionReasonCode';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AdmissionReasonCodeModalType;
  selectedRecord: TAdmissionReasonCode | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TAdmissionReasonCode = {
  id: null,
  admissionReasonCode: '',
  admissionReasonName: '',
  seqNum: null,
};

const AdmissionReasonCodeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    admissionReasonCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    admissionReasonName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TAdmissionReasonCode>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAdmissionReasonCode) => {
      try {
        if (modalType === 'add') {
          const res =
            await admissionReasonCodeApi.createAdmissionReasonCode(data);
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
            await admissionReasonCodeApi.updateAdmissionReasonCode(data);
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

  const handleChange = (key: keyof TAdmissionReasonCode, value: any) => {
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
      label: t('Admission_Reason_Code'),
      name: 'admissionReasonCode',
      key: 'admissionReasonCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionReasonCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionReasonCode', e.target.value);
      },
    },
    {
      label: t('Admission_Reason_Name'),
      name: 'admissionReasonName',
      key: 'admissionReasonName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionReasonName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionReasonName', e.target.value);
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
              ? t('Add_Admission_Reason_Code')
              : modalType === 'edit'
                ? t('Edit_Admission_Reason_Code')
                : t('View_Admission_Reason_Code')}
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

export default AdmissionReasonCodeModal;
