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
  AdmissionShiftCodeModalType,
  TAdmissionShiftCode,
} from 'src/constants/types/his/category/admissionShiftCode';
import admissionShiftCodeApi from 'src/helpers/api/his/category/admissionShiftCode';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AdmissionShiftCodeModalType;
  selectedRecord: TAdmissionShiftCode | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TAdmissionShiftCode = {
  id: null,
  admissionShiftCode: '',
  admissionShiftName: '',
  admissionShiftTime: '',
  seqNum: null,
};

const AdmissionShiftCodeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    admissionShiftCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    admissionShiftName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TAdmissionShiftCode>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAdmissionShiftCode) => {
      try {
        if (modalType === 'add') {
          const res =
            await admissionShiftCodeApi.createAdmissionShiftCode(data);
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
            await admissionShiftCodeApi.updateAdmissionShiftCode(data);
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

  const handleChange = (key: keyof TAdmissionShiftCode, value: any) => {
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
      label: t('Admission_Shift_Code'),
      name: 'admissionShiftCode',
      key: 'admissionShiftCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionShiftCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionShiftCode', e.target.value);
      },
    },
    {
      label: t('Admission_Shift_Name'),
      name: 'admissionShiftName',
      key: 'admissionShiftName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionShiftName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionShiftName', e.target.value);
      },
    },
    {
      label: t('Admission_Shift_Duration'),
      name: 'admissionShiftTime',
      key: 'admissionShiftTime',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionShiftTime,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionShiftTime', e.target.value);
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
              ? t('Add_Admission_Shift_Code')
              : modalType === 'edit'
                ? t('Edit_Admission_Shift_Code')
                : t('View_Admission_Shift_Code')}
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

export default AdmissionShiftCodeModal;
