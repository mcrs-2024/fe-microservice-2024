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
import { TPricePolice } from 'src/constants/types/category/pricePolicies';
import PricePoliciesApi from 'src/helpers/api/category/PricePoliciesApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: CategoryModalType;
  selectedRecord: TPricePolice | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPricePolice = {
  id: null,
  policyPriceTypeGroupCode: '',
  policyPriceTypeGroupRefName: '',
};

const PricePoliciesModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    policyPriceTypeGroupCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    policyPriceTypeGroupRefName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TPricePolice>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPricePolice) => {
      try {
        if (modalType === 'add') {
          const res = await PricePoliciesApi.createPricePolicies(data);
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
          const res = await PricePoliciesApi.updatePricePolicies(data);
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
  const handleChange = (key: keyof TPricePolice, value: any) => {
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
      name: 'policyPriceTypeGroupCode',
      key: 'policyPriceTypeGroupCode',
      label: t('A_price_policy_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.policyPriceTypeGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('policyPriceTypeGroupCode', e.target.value);
      },
    },
    {
      name: 'policyPriceTypeGroupRefName',
      key: 'policyPriceTypeGroupRefName',
      label: t('Price_policy_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.policyPriceTypeGroupRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('policyPriceTypeGroupRefName', e.target.value);
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

export default PricePoliciesModal;
