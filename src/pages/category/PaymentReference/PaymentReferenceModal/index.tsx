// components
import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import {
  CHAPTER_STATUS_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
} from 'src/constants/dumb/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  PaymentReferenceModalType,
  TPaymentReference,
} from 'src/constants/types/category/paymentReference';
import chapterApi from 'src/helpers/api/category/chapterApi';
import paymentReferenceApi from 'src/helpers/api/category/paymentReferenceApi';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: PaymentReferenceModalType;
  selectedRecord: TPaymentReference | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TPaymentReference = {
  arPaymentSubTypeCode: '',
  arPaymentSubTypeRefName: '',
  arPaymentTypeCode: '',
  description: '',
  currencyRcd: '',
};

const PaymentReferenceModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    arPaymentSubTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long')),
    arPaymentSubTypeRefName: Yup.string()
      .required(t('please_enter_required_field'))
      .max(150, t('Too_long'))
      .nullable(),
    arPaymentTypeCode: Yup.string()
      .required(t('please_enter_required_field'))
      .max(20, t('Too_long'))
      .nullable(),
    description: Yup.string()
      .required(t('please_enter_required_field'))
      .max(255, t('Too_long'))
      .nullable(),
  });
  const formControl = useFormik<TPaymentReference>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TPaymentReference) => {
      try {
        if (modalType === 'add') {
          const res = await paymentReferenceApi.createPaymentReference(data);
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
          const res = await paymentReferenceApi.updatePaymentReference(data);
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
  const handleChange = (key: keyof TPaymentReference, value: any) => {
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
      name: 'arPaymentSubTypeCode',
      key: 'arPaymentSubTypeCode',
      label: t('Payment_code'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.arPaymentSubTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentSubTypeCode', e.target.value);
      },
    },
    {
      name: 'arPaymentSubTypeRefName',
      key: 'arPaymentSubTypeRefName',
      label: t('Payment_name'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.arPaymentSubTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('arPaymentSubTypeRefName', e.target.value);
      },
    },
    {
      name: 'arPaymentTypeCode',
      key: 'arPaymentTypeCode',
      label: t('Type_Code'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.arPaymentTypeCode,
      options: PAYMENT_TYPE_OPTIONS,
      onChange: (value: number) => {
        handleChange('arPaymentTypeCode', value);
      },
    },
    // {
    //   name: 'currencyRcd',
    //   key: 'currencyRcd',
    //   label: t('Currency_unit'),
    //   type: TYPE_FIELD.SELECT,
    //   disabled: isDisable,
    //   value: formControl.values.currencyRcd,
    //   options: PAYMENT_TYPE_OPTIONS,
    //   onChange: (value: number) => {
    //     handleChange('currencyRcd', value);
    //   },
    // },
    {
      name: 'description',
      key: 'description',
      label: t('Description'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.description,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
      },
    },
    // {
    //   name: 'description',
    //   key: 'description',
    //   label: t('Description'),
    //   type: TYPE_FIELD.SELECT,
    //   disabled: isDisable,
    //   value: formControl.values.description,
    //   onChange: (e: ChangeEvent<HTMLInputElement>) => {
    //     handleChange('description', e.target.value);
    //   },
    // },
    {
      name: 'currencyRcd',
      key: 'currencyRcd',
      label: t('Currency_unit'),
      type: TYPE_FIELD.SELECT,
      disabled: isDisable,
      value: formControl.values.currencyRcd,
      options: PAYMENT_TYPE_OPTIONS,
      onChange: (value: number) => {
        handleChange('currencyRcd', value);
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
              ? t('Add_payment')
              : modalType === 'edit'
                ? t('Edit_payment')
                : t('View_payment')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
            gutter={[0, 6]}
          />

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

export default PaymentReferenceModal;
