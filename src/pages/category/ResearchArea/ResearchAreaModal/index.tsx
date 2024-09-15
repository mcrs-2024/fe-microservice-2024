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
  ResearchAreaModalType,
  TResearchArea,
} from 'src/constants/types/category/researchArea';
import chapterApi from 'src/helpers/api/category/chapterApi';
import researchAreaApi from 'src/helpers/api/category/researchAreaApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: ResearchAreaModalType;
  selectedRecord: TResearchArea | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TResearchArea = {
  id: null,
  researchAreaCode: '',
  researchAreaName: '',
};

const ResearchAreaModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    researchAreaCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    researchAreaName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TResearchArea>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TResearchArea) => {
      try {
        if (modalType === 'add') {
          const res = await researchAreaApi.createResearchArea(data);
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
          const res = await researchAreaApi.updateResearchArea(data);
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
  const handleChange = (key: keyof TResearchArea, value: any) => {
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
      name: 'researchAreaCode',
      key: 'researchAreaCode',
      label: t('research_field_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.maChuong,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('researchAreaCode', e.target.value);
      },
    },
    {
      name: 'researchAreaName',
      key: 'researchAreaName',
      label: t('research_field_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.researchAreaName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('researchAreaName', e.target.value);
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
              ? t('Add_chapter_category')
              : modalType === 'edit'
                ? t('Edit_chapter_category')
                : t('View_chapter_category')}
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

export default ResearchAreaModal;
