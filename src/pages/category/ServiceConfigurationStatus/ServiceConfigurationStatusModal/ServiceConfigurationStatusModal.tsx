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
  ServiceConfigurationStatusModalType,
  TServiceConfigurationStatus,
} from 'src/constants/types/category/serviceConfigurationStatus';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: ServiceConfigurationStatusModalType;
  selectedRecord: TServiceConfigurationStatus | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TServiceConfigurationStatus = {
  id: null,
  icdChapterCode: '',
  icdChapterNameV: '',
  hoatDong: 1,
};

const ServiceConfigurationStatusModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    maChuong: Yup.string()
      .required(t('please_enter_required_field'))
      .min(4, t('Too_short'))
      .max(255, t('Too_long'))
      .nullable(),
    tenChuong: Yup.string()
      .required(t('please_enter_required_field'))
      .min(6, t('Too_short'))
      .max(255, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TServiceConfigurationStatus>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TServiceConfigurationStatus) => {
      try {
        if (modalType === 'add') {
          const res = await chapterApi.createChapter(data);
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
          const res = await chapterApi.updateChapter(data);
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
  const handleChange = (key: keyof TServiceConfigurationStatus, value: any) => {
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
      name: 'maChuong',
      key: 'maChuong',
      label: t('ServiceConfigurationStatusName'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.maChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maChuong', e.target.value);
      },
    },
    {
      name: 'maChuong',
      key: 'maChuong',
      label: t('Detail_description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.maChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maChuong', e.target.value);
      },
    },
    {
      name: 'icdChapterNameV',
      key: 'tenChuong',
      label: t('Reminder'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenChuong', e.target.value);
      },
    },
    {
      name: 'hoatDong',
      key: 'hoatDong',
      label: t('Health Insurance faculty'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.hoatDong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hoatDong', e.target.value);
      },
    },
    {
      name: 'hoatDong',
      key: 'hoatDong',
      label: t('Price code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.hoatDong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hoatDong', e.target.value);
      },
    },
    {
      name: 'hoatDong',
      key: 'hoatDong',
      label: t('Price_Status_Name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.hoatDong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hoatDong', e.target.value);
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
              ? t('Add_serviceconfigurationstatus_category')
              : modalType === 'edit'
                ? t('Edit_serviceconfigurationstatus_category')
                : t('View_serviceconfigurationstatus_category')}
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

export default ServiceConfigurationStatusModal;
