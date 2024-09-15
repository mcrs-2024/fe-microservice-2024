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
import { CategoryModalType } from 'src/constants/types';
import { TChapter } from 'src/constants/types/category/chapter';
import { HealthModalType, THealth } from 'src/constants/types/category/health';
import chapterApi from 'src/helpers/api/category/chapterApi';
import healthApi from 'src/helpers/api/category/health';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: HealthModalType;
  selectedRecord: THealth | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: THealth = {
  healthScoreCode: '',
  healthScoreName: '',
};

const HealthModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    healthScoreCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('max_length_exceeded'))
      .nullable(),
    healthScoreName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('max_length_exceeded'))
      .nullable(),
  });
  const formControl = useFormik<THealth>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: THealth) => {
      try {
        if (modalType === 'add') {
          const res = await healthApi.createHealth(data); // change api
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
          const res = await healthApi.updateHealth(data); // change api
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
  const handleChange = (key: keyof THealth, value: any) => {
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
      name: 'healthScoreCode',
      key: 'healthScoreCode',
      label: t('Health_classification'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.healthScoreCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('healthScoreCode', e.target.value);
      },
    },
    {
      name: 'healthScoreName',
      key: 'healthScoreName',
      label: t('Health_classification_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.healthScoreName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('healthScoreName', e.target.value);
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
              ? t('Add_health_classification')
              : modalType === 'edit'
                ? t('Edit_health_classification')
                : t('View_health_classification')}
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

export default HealthModal;
