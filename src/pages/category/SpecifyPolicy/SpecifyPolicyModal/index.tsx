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
  SpecifyPolicyModalType,
  TSpecifyPolicy,
} from 'src/constants/types/category/specifyPolicy';
import chapterApi from 'src/helpers/api/category/chapterApi';
import specifyPolicyApi from 'src/helpers/api/category/specifyPolicy';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: SpecifyPolicyModalType;
  selectedRecord: TSpecifyPolicy | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TSpecifyPolicy = {
  specifyPolicyGroupCode: '',
  specifyPolicyGroupName: '',
  specifyPolicyGroupDescription: '',
};

const SpecifyPolicyModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    specifyPolicyGroupCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    specifyPolicyGroupName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters')),
    specifyPolicyGroupDescription: Yup.string()
      .required(t('please_enter_required_field'))
      .max(255, t('Too_long')),
  });
  const formControl = useFormik<TSpecifyPolicy>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TSpecifyPolicy) => {
      try {
        if (modalType === 'add') {
          const res = await specifyPolicyApi.createSpecifyPolicy(data);
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
          const res = await specifyPolicyApi.updateSpecifyPolicy(data);
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
  const handleChange = (key: keyof TSpecifyPolicy, value: any) => {
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
      name: 'specifyPolicyGroupCode',
      key: 'specifyPolicyGroupCode',
      label: t('appointment_group_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.specifyPolicyGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifyPolicyGroupCode', e.target.value);
      },
    },
    {
      name: 'specifyPolicyGroupName',
      key: 'specifyPolicyGroupName',
      label: t('appointment_group_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.specifyPolicyGroupName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifyPolicyGroupName', e.target.value);
      },
    },
    {
      name: 'specifyPolicyGroupDescription',
      key: 'specifyPolicyGroupDescription',
      label: t('Description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.specifyPolicyGroupDescription,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('specifyPolicyGroupDescription', e.target.value);
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
              ? t('Add_payment')
              : modalType === 'edit'
                ? t('Edit_payment')
                : t('View_payment')}
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

export default SpecifyPolicyModal;
