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
  PaymentGroupsModalType,
  TPaymentGroups,
} from 'src/constants/types/category/paymentGroups';
import paymentGroupApi from 'src/helpers/api/category/paymentGroup';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PaymentGroupsModalType;
  selectedRecord: TPaymentGroups | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPaymentGroups = {
  arPaymentTypeGroupCode: null,
  arPaymentTypeGroupRefName: null,
  description: null,
  requiresSubTypeFlag: false,
};

const PaymentGroupModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    arPaymentTypeGroupRefName: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TPaymentGroups>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPaymentGroups) => {
      try {
        if (modalType === 'add') {
          const res = await paymentGroupApi.createPaymentGroup(data);
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
          const res = await paymentGroupApi.updatePaymentGroup(data);
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
  const handleChange = (key: keyof TPaymentGroups, value: any) => {
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
      name: 'arPaymentTypeGroupCode',
      key: 'arPaymentTypeGroupCode',
      label: t('Group_code'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.arPaymentTypeGroupCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentTypeGroupCode', e.target.value);
      },
    },
    {
      name: 'arPaymentTypeGroupRefName',
      key: 'arPaymentTypeGroupRefName',
      label: t('Group_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.arPaymentTypeGroupRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentTypeGroupRefName', e.target.value);
      },
    },
    {
      name: 'description',
      key: 'description',
      label: t('description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.description,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
      },
    },
    {
      name: 'requiresSubTypeFlag',
      key: 'requiresSubTypeFlag',
      label: t('requiresSubTypeFlag'),
      type: TYPE_FIELD.CHECKBOX,
      disabled: isDisable,
      value: formControl.values.requiresSubTypeFlag,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('requiresSubTypeFlag', e.target.checked);
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
              ? t('Add_paymentgroups_category')
              : modalType === 'edit'
                ? t('Edit_paymentgroups_category')
                : t('View_paymentgroups_category')}
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

export default PaymentGroupModal;
