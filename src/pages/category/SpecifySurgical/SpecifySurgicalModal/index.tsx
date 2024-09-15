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
  SpecifySurgicalModalType,
  TSpecifySurgical,
} from 'src/constants/types/category/specifySurgical';
import specifySurgicalApi from 'src/helpers/api/category/specifySurgicalApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: SpecifySurgicalModalType;
  selectedRecord: TSpecifySurgical | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TSpecifySurgical = {
  id: null,
  specifySurgicalGroupCode: '',
  specifySurgicalGroupName: '',
  specifySurgicalGroupDescription: '',
};

const SpecifySurgicalModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    specifySurgicalGroupCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    specifySurgicalGroupName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
    specifySurgicalGroupDescription: Yup.string()
      .required(t('please_enter_required_field'))
      .max(250, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TSpecifySurgical>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TSpecifySurgical) => {
      try {
        if (modalType === 'add') {
          const res = await specifySurgicalApi.createSpecifySurgical(data);
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
          const res = await specifySurgicalApi.updateSpecifySurgical(data);
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
  const handleChange = (key: keyof TSpecifySurgical, value: any) => {
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
      name: 'specifySurgicalGroupCode',
      key: 'specifySurgicalGroupCode',
      label: t('surgery_group_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.specifySurgicalGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifySurgicalGroupCode', e.target.value);
      },
    },
    {
      name: 'specifySurgicalGroupName',
      key: 'specifySurgicalGroupName',
      label: t('surgery_group_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.specifySurgicalGroupName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifySurgicalGroupName', e.target.value);
      },
    },
    {
      name: 'specifySurgicalGroupDescription',
      key: 'specifySurgicalGroupDescription',
      label: t('Description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.specifySurgicalGroupDescription,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifySurgicalGroupDescription', e.target.value);
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
              ? t('Add_surgery_group')
              : modalType === 'edit'
                ? t('Edit_surgery_group')
                : t('View_surgery_group')}
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

export default SpecifySurgicalModal;
