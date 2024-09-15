// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { SourceModalType, TSource } from 'src/constants/types/category/source';
import chapterApi from 'src/helpers/api/category/chapterApi';
import visitReasonApi from 'src/helpers/api/category/visitSource';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: SourceModalType;
  selectedRecord: TSource | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TSource = {
  id: null,
  visitSourceCode: null,
  visitSourceName: null,
};

const VisitSourceModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    visitSourceCode: Yup.string()
      .required(t('please_enter_required_field'))
      .min(0, t('Too_short'))
      .max(255, t('Please enter a positive number'))
      .nullable(),
    visitSourceName: Yup.string()
      .required(t('please_enter_required_field'))
      .min(5, t('Too_short'))
      .max(255, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TSource>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TSource) => {
      try {
        if (modalType === 'add') {
          const res = await visitReasonApi.createVisitReason(data); // change api
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
          const res = await visitReasonApi.updateVisitReason(data); // change api
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
  const handleChange = (key: keyof TSource, value: any) => {
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
      name: 'visitSourceCode',
      key: 'visitSourceCode',
      label: t('source'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.visitSourceCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('visitSourceCode', e.target.value);
      },
    },
    {
      name: 'visitSourceName',
      key: 'visitSourceName',
      label: t('source_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.visitSourceName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('visitSourceName', e.target.value);
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
              ? t('Add_source')
              : modalType === 'edit'
                ? t('Edit_source')
                : t('view_source')}
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

export default VisitSourceModal;
