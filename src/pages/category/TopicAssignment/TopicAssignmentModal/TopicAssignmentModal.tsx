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
  TopicAssignmentModalType,
  TTopicAssignment,
} from 'src/constants/types/category/topicAssignments';
import topicAssignmentApi from 'src/helpers/api/category/topicAssignment';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: TopicAssignmentModalType;
  selectedRecord: TTopicAssignment | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TTopicAssignment = {
  id: null,
  levelOfTopicCode: null,
  levelOfTopicName: null,
  formatTopicCode: null,
};

const TopicAssignmentModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    levelOfTopicCode: Yup.number()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_the_topic_code'))
      .nullable(),
    levelOfTopicName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required(t('Please_enter_the_topic_name'))
      .nullable(),
    formatTopicCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_the_topic_format'))
      .nullable(),
  });

  const formControl = useFormik<TTopicAssignment>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TTopicAssignment) => {
      try {
        if (modalType === 'add') {
          const res = await topicAssignmentApi.createTopicAssignment(data);
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
          const res = await topicAssignmentApi.updateTopicAssignment(data);
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
  const handleChange = (key: keyof TTopicAssignment, value: any) => {
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
      name: 'levelOfTopicCode',
      key: 'levelOfTopicCode',
      label: t('Topic_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.levelOfTopicCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('levelOfTopicCode', e.target.value);
      },
    },
    {
      name: 'levelOfTopicName',
      key: 'levelOfTopicName',
      label: t('Topic_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.levelOfTopicName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('levelOfTopicName', e.target.value);
      },
    },
    {
      name: 'formatTopicCode',
      key: 'formatTopicCode',
      label: t('Format_Code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.formatTopicCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('formatTopicCode', e.target.value);
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
              ? t('Add_topic_assignment_category')
              : modalType === 'edit'
                ? t('Edit_topic_assignment_category')
                : t('View_topic_assignment_category')}
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

export default TopicAssignmentModal;
