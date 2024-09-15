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
  InsuranceDetailCodeModalType,
  TInsuranceDetailCode,
} from 'src/constants/types/his/category/insuranceDetailCode';
import insuranceDetailCodeApi from 'src/helpers/api/his/category/insuranceDetailCode';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: InsuranceDetailCodeModalType;
  selectedRecord: TInsuranceDetailCode | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TInsuranceDetailCode = {
  id: null,
  insuranceEntityDetailCode: '',
  insuranceEntityDetailName: '',
  percentageOfCoPayment: null,
  paymentUnit: '',
  seqNum: null,
};

const InsuranceDetailCodeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    insuranceEntityDetailCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    insuranceEntityDetailName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TInsuranceDetailCode>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TInsuranceDetailCode) => {
      try {
        if (modalType === 'add') {
          const res =
            await insuranceDetailCodeApi.createInsuranceDetailCode(data);
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
          const res =
            await insuranceDetailCodeApi.updateInsuranceDetailCode(data);
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

  const handleChange = (key: keyof TInsuranceDetailCode, value: any) => {
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
      label: t('Insurance_Detail_Code'),
      name: 'insuranceEntityDetailCode',
      key: 'insuranceEntityDetailCode',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.insuranceEntityDetailCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('insuranceEntityDetailCode', e.target.value);
      },
    },
    {
      label: t('Insurance_Detail_Name'),
      name: 'insuranceEntityDetailName',
      key: 'insuranceEntityDetailName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.insuranceEntityDetailName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('insuranceEntityDetailName', e.target.value);
      },
    },
    {
      label: t('Insurance_Detail_Percentage'),
      name: 'percentageOfCoPayment',
      key: 'percentageOfCoPayment',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.percentageOfCoPayment,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('percentageOfCoPayment', e.target.value);
      },
    },
    {
      label: t('Insurance_Detail_Payer_Unit'),
      name: 'paymentUnit',
      key: 'paymentUnit',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.paymentUnit,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('paymentUnit', e.target.value);
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
              ? t('Add_Insurance_Detail_Code')
              : modalType === 'edit'
                ? t('Edit_Insurance_Detail_Code')
                : t('View_Insurance_Detail_Code')}
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

export default InsuranceDetailCodeModal;
