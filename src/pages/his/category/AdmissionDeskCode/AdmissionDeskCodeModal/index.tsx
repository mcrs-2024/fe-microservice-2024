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
  AdmissionDeskCodeModalType,
  TAdmissionDeskCode,
} from 'src/constants/types/his/category/admissionDeskCode';
import admissionDeskCodeApi from 'src/helpers/api/his/category/admissionDeskCode';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AdmissionDeskCodeModalType;
  selectedRecord: TAdmissionDeskCode | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TAdmissionDeskCode = {
  id: null,
  admissionDeskCode: '',
  admissionDeskName: '',
  admissionAreaId: '',
  seqNum: null,
};

const AdmissionDeskCodeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    admissionDeskCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    admissionDeskName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TAdmissionDeskCode>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAdmissionDeskCode) => {
      try {
        if (modalType === 'add') {
          const res = await admissionDeskCodeApi.createAdmissionDeskCode(data);
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
          const res = await admissionDeskCodeApi.updateAdmissionDeskCode(data);
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

  const handleChange = (key: keyof TAdmissionDeskCode, value: any) => {
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
      label: t('Admission_Desk_Code'),
      name: 'admissionDeskCode',
      key: 'admissionDeskCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionDeskCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionDeskCode', e.target.value);
      },
    },
    {
      label: t('Admission_Desk_Name'),
      name: 'admissionDeskName',
      key: 'admissionDeskName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.admissionDeskName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('admissionDeskName', e.target.value);
      },
    },
    {
      label: t('Admission_Area_Name'),
      name: 'admissionAreaId',
      key: 'admissionAreaId',
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.admissionAreaId,
      onChange: (value: string) => {
        handleChange('admissionAreaId', value);
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
              ? t('Add_Admission_Desk_Code')
              : modalType === 'edit'
                ? t('Edit_Admission_Desk_Code')
                : t('View_Admission_Desk_Code')}
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

export default AdmissionDeskCodeModal;
