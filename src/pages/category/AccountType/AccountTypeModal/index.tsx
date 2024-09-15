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
  AccountModalType,
  TAccountType,
} from 'src/constants/types/category/accountType';
import accountTypeApi from 'src/helpers/api/category/accountTypeApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: AccountModalType;
  selectedRecord: TAccountType | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TAccountType = {
  customerTypeCode: '',
  customerTypeRefName: '',
};

const AccountTypeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    customerTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long_maximum_20_characters'))
      .nullable(),
    customerTypeRefName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long_maximum_150_characters'))
      .nullable(),
  });
  const formControl = useFormik<TAccountType>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TAccountType) => {
      try {
        if (modalType === 'add') {
          const res = await accountTypeApi.createAccountType(data);
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
          const res = await accountTypeApi.updateAccountType(data);
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
  const handleChange = (key: keyof TAccountType, value: any) => {
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
      name: 'customerTypeCode',
      key: 'customerTypeCode',
      label: t('account_type'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.customerTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('customerTypeCode', e.target.value);
      },
    },
    {
      name: 'customerTypeRefName',
      key: 'customerTypeRefName',
      label: t('account_type_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.customerTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('customerTypeRefName', e.target.value);
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
              ? t('Add_account_type')
              : modalType === 'edit'
                ? t('Edit_account_type')
                : t('View_account_type')}
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

export default AccountTypeModal;
