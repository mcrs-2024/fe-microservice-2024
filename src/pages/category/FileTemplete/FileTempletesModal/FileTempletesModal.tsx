import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Flex,
  message,
  Modal,
  Space,
  Typography,
  UploadFile,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  FileTemplateModalType,
  TFileTemplate,
} from 'src/constants/types/category/fileTemplete';
import fileTemplateApi from 'src/helpers/api/category/fileTemplete';
import { checkFileSizeBeforeUpload } from 'src/utils/file';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: FileTemplateModalType;
  selectedRecord: TFileTemplate | null;
  onHide: () => void;
  onSuccess: () => void;
}
type FormValues =
  | {
      fileTemplateId: string | null;
      fileTemplateRefName: string | null;
    }
  | TFileTemplate;

const defaultValue: FormValues = {
  fileTemplateId: null,
  fileTemplateRefName: null,
};

const FileTempleteModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'edit';

  const formSchema = yupObject({
    fileTemplateRefName: Yup.string()
      .max(250, 'Too_Long')
      .required(t('Enter_file_templete_name'))
      .nullable(),
  });
  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      try {
        if (modalType === 'add') {
          const res = await fileTemplateApi.createFileTemplate(data);
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
          const res = await fileTemplateApi.updateFileTemplate(data);
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
  const handleChange = (key: keyof FormValues, value: any) => {
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
      name: 'fileTemplateId',
      key: 'fileTemplateId',
      label: t('fileTemplateRId'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'add',
      value: formControl.values.fileTemplateId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fileTemplateId', e.target.value);
      },
    },
    {
      name: 'fileTemplateRefName',
      key: 'fileTemplateRefName',
      label: t('templateFileName'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.fileTemplateRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('fileTemplateRefName', e.target.value);
      },
    },
    // {
    //   name: 'templeFileLink',
    //   key: 'templeFileLink',
    //   label: t('templeFileLink'),
    //   type: TYPE_FIELD.FILE_UPLOAD,
    //   disabled: isDisable,
    //   value: formControl.values.templeFileLink,
    //   onChange: async (files: UploadFile) => {
    //     const dataURI = checkFileSizeBeforeUpload(files as RcFile, 21);
    //     handleChange('templeFileLink', dataURI);
    //   },
    //   maxCount: 100,
    // },
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
              ? t('Add file templete')
              : modalType === 'edit'
                ? t('Edit file templete')
                : t('View file templete')}
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

export default FileTempleteModal;
