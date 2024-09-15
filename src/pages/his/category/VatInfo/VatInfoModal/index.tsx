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
  TVatInfo,
  vatInfoModalType,
} from 'src/constants/types/his/category/vatInfo';
import vatInfoApi from 'src/helpers/api/his/category/vatInfo';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: vatInfoModalType;
  selectedRecord: TVatInfo | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TVatInfo = {
  id: '',
  companyName: '',
  taxCode: '',
  companyAddress: '',
  seqNum: null,
};

const VatInfoModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    taxCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    companyName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TVatInfo>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TVatInfo) => {
      try {
        if (modalType === 'add') {
          const res = await vatInfoApi.createVatInfoModal(data);
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
          const res = await vatInfoApi.updateVatInfoModal(data);
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

  const handleChange = (key: keyof TVatInfo, value: any) => {
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
      label: t('Company_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'companyName',
      className: 'w-100',
      allowClear: true,
      value: formControl.values.companyName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChange('companyName', e.target.value),
    },
    {
      label: t('Company_Address'),
      type: TYPE_FIELD.TEXT,
      name: 'companyAddress',
      className: 'w-100',
      allowClear: true,
      value: formControl.values.companyAddress,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChange('companyAddress', e.target.value),
    },
    {
      label: t('Tax_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'taxCode',
      className: 'w-100',
      allowClear: true,
      value: formControl.values.taxCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChange('taxCode', e.target.value),
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
              ? t('Add_VAT_Info')
              : modalType === 'edit'
                ? t('Edit_VAT_Info')
                : t('View_VAT_Info')}
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

export default VatInfoModal;
