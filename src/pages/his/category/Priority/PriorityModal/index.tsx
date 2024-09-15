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
  PriorityModalType,
  TPriority,
} from 'src/constants/types/his/category/priority';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PriorityModalType;
  selectedRecord: TPriority | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPriority = {
  id: '',
  priorityTypeCode: '',
  priorityTypeName: '',
  seqNum: null,
};

const PriorityModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    Priority_Type_Code: Yup.string().required().nullable(),
    Priority_Type_Name: Yup.string().required().nullable(),
  });

  const formControl = useFormik<TPriority>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPriority) => {
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
  const handleChange = (key: keyof TPriority, value: any) => {
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
      name: 'priorityTypeCode',
      key: 'priorityTypeCode',
      label: t('Priority_Type_Code'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.priorityTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('priorityTypeCode', e.target.value);
      },
    },
    {
      name: 'priorityTypeName',
      key: 'priorityTypeName',
      label: t('Priority_Type_Name'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.Priority_Type_Name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('priorityTypeName', e.target.value);
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
              ? t('Add_Priority')
              : modalType === 'edit'
                ? t('Edit_Priority')
                : t('View_Priority')}
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

export default PriorityModal;
