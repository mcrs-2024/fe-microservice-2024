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
  DocumentProtectionModalType,
  TDocumentProtection,
} from 'src/constants/types/category/documentProtection';
import documentProtectionApi from 'src/helpers/api/category/documentProtectionApi';
import { numberOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: DocumentProtectionModalType;
  selectedRecord: TDocumentProtection | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TDocumentProtection = {
  id: null,
  documentProtectionLevelName: '',
  level: null,
};

const DocumentProtectionModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    documentProtectionLevelName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(255, t('Too_long'))
      .nullable(),
    level: numberOnly,
  });
  const formControl = useFormik<TDocumentProtection>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TDocumentProtection) => {
      try {
        if (modalType === 'add') {
          const res =
            await documentProtectionApi.createDocumentProtection(data);
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
            await documentProtectionApi.updateDocumentProtection(data);
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
  const handleChange = (key: keyof TDocumentProtection, value: any) => {
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
      name: 'documentProtectionLevelName',
      key: 'documentProtectionLevelName',
      label: t('security_level_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.documentProtectionLevelName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('documentProtectionLevelName', e.target.value);
      },
    },
    {
      name: 'level',
      key: 'level',
      label: t('Level'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.level,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('level', e.target.value);
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
              ? t('Add_security_level')
              : modalType === 'edit'
                ? t('Edit_security_level')
                : t('View_security_level')}
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

export default DocumentProtectionModal;
