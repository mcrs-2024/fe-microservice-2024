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
  QualificationModalType,
  TQualification,
} from 'src/constants/types/category/qualification';
import qualificationApi from 'src/helpers/api/category/qualification';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: QualificationModalType;
  selectedRecord: TQualification | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TQualification = {
  qualificationTypeCode: '',
  qualificationTypeName: '',
};
const QualificationModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    qualificationTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    qualificationTypeName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TQualification>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TQualification) => {
      try {
        if (modalType === 'add') {
          const res = await qualificationApi.createQualification(data);
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
          const res = await qualificationApi.updateQualification(data);
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
  const handleChange = (key: keyof TQualification, value: any) => {
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
      name: 'qualificationTypeCode',
      key: 'qualificationTypeCode',
      label: t('Code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.qualificationTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('qualificationTypeCode', e.target.value);
      },
    },
    {
      name: 'qualificationTypeName',
      key: 'qualificationTypeName',
      label: t('professional_level_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.qualificationTypeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('qualificationTypeName', e.target.value);
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
              ? t('add_professional_level')
              : modalType === 'edit'
                ? t('edit_professional_level')
                : t('view_professional_level')}
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

export default QualificationModal;
