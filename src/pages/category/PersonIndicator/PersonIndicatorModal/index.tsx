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
import {
  PersonIndicatorModalType,
  TPersonIndicator,
} from 'src/constants/types/category/PersonIndicator';
import chapterApi from 'src/helpers/api/category/chapterApi';
import personIndicatorApi from 'src/helpers/api/category/PersonIndicatorApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PersonIndicatorModalType;
  selectedRecord: TPersonIndicator | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPersonIndicator = {
  personIndicatorTypeCode: '',
  personIndicatorTypeRefName: '',
};

const PersonIndicatorModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    personIndicatorTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    personIndicatorTypeRefName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TPersonIndicator>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPersonIndicator) => {
      try {
        if (modalType === 'add') {
          const res = await personIndicatorApi.createPersonIndicator(data);
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
          const res = await personIndicatorApi.updatePersonIndicator(data);
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
  const handleChange = (key: keyof TPersonIndicator, value: any) => {
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
      name: 'personIndicatorTypeCode',
      key: 'personIndicatorTypeCode',
      label: t('Person_indicator_type_record'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.personIndicatorTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('personIndicatorTypeCode', e.target.value);
      },
    },
    {
      name: 'personIndicatorTypeRefName',
      key: 'personIndicatorTypeRefName',
      label: t('Person_indicator_type_reference_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.personIndicatorTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('personIndicatorTypeRefName', e.target.value);
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
              ? t('Add_person_indicator_type')
              : modalType === 'edit'
                ? t('edit_person_indicator_type')
                : t('view_person_indicator_type')}
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

export default PersonIndicatorModal;
