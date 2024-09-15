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
  DocumentTypesModalType,
  TDocumentTypes,
} from 'src/constants/types/category/documenTypes';
import documentTypeApi from 'src/helpers/api/category/documentTypeApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: DocumentTypesModalType;
  selectedRecord: TDocumentTypes | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TDocumentTypes = {
  id: null,
  documentRelatedTopicCode: '',
  documentRelatedTopicName: '',
};

const DocumenTypesModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    documentRelatedTopicCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    documentRelatedTopicName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(155, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TDocumentTypes>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TDocumentTypes) => {
      try {
        if (modalType === 'add') {
          const res = await documentTypeApi.createDocumentType(data);
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
          const res = await documentTypeApi.updateDocumentType(data);
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
  const handleChange = (key: keyof TDocumentTypes, value: any) => {
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
      name: 'documentRelatedTopicCode',
      key: 'documentRelatedTopicCode',
      label: t('document_type'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.documentRelatedTopicCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('documentRelatedTopicCode', e.target.value);
      },
    },
    {
      name: 'documentRelatedTopicName',
      key: 'documentRelatedTopicName',
      label: t('document_type_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.documentRelatedTopicName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('documentRelatedTopicName', e.target.value);
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
              ? t('Add_document_type')
              : modalType === 'edit'
                ? t('Edit_document_type')
                : t('View_document_type')}
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

export default DocumenTypesModal;
