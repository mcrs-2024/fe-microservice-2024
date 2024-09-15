// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TCurrency } from 'src/constants/types/category/currency';
import { TPaymentGroups } from 'src/constants/types/category/paymentGroups';
import {
  PaymentTypeModalType,
  TPaymentType,
} from 'src/constants/types/category/paymentType';
import paymentApi, {
  useGetAllCurrency,
  useGetAllGroupPayment,
} from 'src/helpers/api/category/paymentType';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PaymentTypeModalType;
  selectedRecord: TPaymentType | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPaymentType = {
  id: null,
  arPaymentTypeCode: '',
  arPaymentTypeGroupCode: '',
  arPaymentTypeRefName: '',
  description: '',
  seqNum: '',
  currency: '',
};

const PaymentTypeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: currencies } = useGetAllCurrency();
  const { data: groupPayments } = useGetAllGroupPayment();

  const formSchema = yupObject({
    arPaymentTypeCode: Yup.string().required().nullable(),
    arPaymentTypeGroupCode: Yup.string().required().nullable(),
    arPaymentTypeRefName: Yup.string().required().nullable(),
  });
  const formControl = useFormik<TPaymentType>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPaymentType) => {
      try {
        if (modalType === 'add') {
          const res = await paymentApi.createPaymentType(data);
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
          const res = await paymentApi.updatePaymentType(data);
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
  const handleChange = (key: keyof TPaymentType, value: any) => {
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
      name: 'arPaymentTypeCode',
      key: 'arPaymentTypeCode',
      label: t('Type_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.arPaymentTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentTypeCode', e.target.value);
      },
    },
    {
      name: 'arPaymentTypeGroupCode',
      key: 'arPaymentTypeGroupCode',
      label: t('Payment_group_code'),
      type: TYPE_FIELD.SELECT,
      options: groupPayments?.data?.map((gpy: TPaymentGroups) => ({
        value: gpy.arPaymentTypeGroupCode ?? null,
        label: gpy.arPaymentTypeGroupRefName ?? null,
      })),
      disabled: isDisable,
      value: formControl.values.arPaymentTypeGroupCode,
      onChange: (value: string) => {
        handleChange('arPaymentTypeGroupCode', value);
      },
    },
    {
      name: 'arPaymentTypeRefName',
      key: 'arPaymentTypeRefName',
      label: t('Type_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.arPaymentTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentTypeRefName', e.target.value);
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
      name: 'currency',
      key: 'currency',
      label: t('Currency_unit'),
      type: TYPE_FIELD.SELECT,
      options: currencies?.data?.map((curr: TCurrency) => ({
        value: curr.id ?? null,
        label: curr.currencyName ?? null,
      })),
      disabled: isDisable,
      value: formControl.values.currency,
      onChange: (value: string) => {
        handleChange('currency', value);
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
              ? t('Add_paymenttype_category')
              : modalType === 'edit'
                ? t('Edit_paymenttype_category')
                : t('View_paymenttype_category')}
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

export default PaymentTypeModal;
