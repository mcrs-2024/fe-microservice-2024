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
  ReceivingSourceModalType,
  TReceivingSource,
} from 'src/constants/types/his/category/recievingSource';
import receivingSourceApi from 'src/helpers/api/his/category/receivingSource';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: ReceivingSourceModalType;
  selectedRecord: TReceivingSource | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TReceivingSource = {
  id: null,
  recievingSourceCode: '',
  recievingSourceName: '',
  seqNum: null,
};

const ReceivingSourceModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    recievingSourceCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    recievingSourceName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TReceivingSource>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TReceivingSource) => {
      try {
        if (modalType === 'add') {
          const res = await receivingSourceApi.createReceivingSourceModal(data);
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
          const res = await receivingSourceApi.updateReceivingSourceModal(data);
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

  const handleChange = (key: keyof TReceivingSource, value: any) => {
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
      label: t('Receiving_source_code'),
      name: 'recievingSourceCode',
      key: 'recievingSourceCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.recievingSourceCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('recievingSourceCode', e.target.value);
      },
    },
    {
      label: t('Receiving_source_name'),
      name: 'recievingSourceName',
      key: 'recievingSourceName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.recievingSourceName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('recievingSourceName', e.target.value);
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
              ? t('Add_Receiving_Source')
              : modalType === 'edit'
                ? t('Edit_Receiving_Source')
                : t('View_Receiving_Source')}
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

export default ReceivingSourceModal;
