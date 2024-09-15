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
  AccidentModalType,
  TAccident,
} from 'src/constants/types/category/acident';
import accidentApi from 'src/helpers/api/category/acident';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AccidentModalType;
  selectedRecord: TAccident | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAccident = {
  id: null,
  casualtyCode: '',
  casualtyName: '',
  seqNum: null,
};

const AccidentModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    casualtyCode: Yup.string()
      .required(t('please_enter_required_field'))
      .min(0, t('Too_short'))
      .max(20, t('Too_long'))
      .nullable(),
    casualtyName: Yup.string()
      .required(t('please_enter_required_field'))
      .min(5, t('Too_short'))
      .max(150, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TAccident>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAccident) => {
      try {
        if (modalType === 'add') {
          const res = await accidentApi.createAcident(data);
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
          const res = await accidentApi.updateAcident(data);
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
  const handleChange = (key: keyof TAccident, value: any) => {
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
      name: 'casualtyCode',
      key: 'casualtyCode',
      label: t('Accident'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.casualtyCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('casualtyCode', e.target.value);
      },
    },
    {
      name: 'casualtyName',
      key: 'casualtyName',
      label: t('name_accident'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.casualtyName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('casualtyName', e.target.value);
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
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_accident')
              : modalType === 'edit'
                ? t('Edit_accident')
                : t('View_accident')}
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

export default AccidentModal;
