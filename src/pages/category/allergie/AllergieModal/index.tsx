// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { NHA_CUNG_CAP } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AllerginModalType,
  TAllergin,
} from 'src/constants/types/category/allergie';
import allerginApi from 'src/helpers/api/category/allerginApi';
import chapterApi from 'src/helpers/api/category/chapterApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AllerginModalType;
  selectedRecord: TAllergin | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAllergin = {
  id: null,
  adverseReactionCauseTypeCode: '',
  name: '',
};

const AllergieModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    adverseReactionCauseTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    name: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TAllergin>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAllergin) => {
      try {
        if (modalType === 'add') {
          const res = await allerginApi.createAllergin(data);
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
          const res = await allerginApi.updateAllergin(data);
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
  const handleChange = (key: keyof TAllergin, value: any) => {
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
      name: 'adverseReactionCauseTypeCode',
      key: 'adverseReactionCauseTypeCode',
      label: t('allergy_code'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable || modalType === 'edit',
      options: NHA_CUNG_CAP,
      value: formControl.values.adverseReactionCauseTypeCode,
      onChange: (value: string | null) => {
        handleChange('adverseReactionCauseTypeCode', value);
      },
    },
    {
      name: 'name',
      key: 'name',
      label: t('allergy_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('name', e.target.value);
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

export default AllergieModal;
