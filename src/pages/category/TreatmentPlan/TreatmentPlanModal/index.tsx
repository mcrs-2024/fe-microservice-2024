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
  TreatmentPlansModalType,
  TTreatmentPlans,
} from 'src/constants/types/category/treatmentPlans';
import chapterApi from 'src/helpers/api/category/chapterApi';
import treatmentPlanApi from 'src/helpers/api/category/treatmentPlanApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: TreatmentPlansModalType;
  selectedRecord: TTreatmentPlans | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TTreatmentPlans = {
  id: null,
  treatmentPlansCode: '',
  treatmentPlansName: '',
};

const TreatmentPlansModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    treatmentPlansCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    treatmentPlansName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TTreatmentPlans>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TTreatmentPlans) => {
      try {
        if (modalType === 'add') {
          const res = await treatmentPlanApi.createTreatmentPlan(data);
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
          const res = await treatmentPlanApi.updateTreatmentPlan(data);
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
  const handleChange = (key: keyof TTreatmentPlans, value: any) => {
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
      name: 'treatmentPlansCode',
      key: 'treatmentPlansCode',
      label: t('Treatment_plan_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.treatmentPlansCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('treatmentPlansCode', e.target.value);
      },
    },
    {
      name: 'treatmentPlansName',
      key: 'treatmentPlansName',
      label: t('Chapter_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.tenChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('treatmentPlansName', e.target.value);
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
              ? t('Add_treatment_plan')
              : modalType === 'edit'
                ? t('Edit_treatment_plan')
                : t('View_treatment_plan')}
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

export default TreatmentPlansModal;
