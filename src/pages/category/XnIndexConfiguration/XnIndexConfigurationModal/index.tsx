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
  TXnIndexConfiguration,
  XnIndexConfigurationModalType,
} from 'src/constants/types/category/xnIndexConfiguration';
import xnIndexConfigurationApi from 'src/helpers/api/category/xnIndexConfiguration';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: XnIndexConfigurationModalType;
  selectedRecord: TXnIndexConfiguration | null;
  onHide: () => void;
  onSuccess: () => void;
}
const defaultValue: TXnIndexConfiguration = {
  labMachineIndexCode: '',
  labMachineIndexName: '',
  labMachineTypeCode: '',
  labMachineCode: '',
};

const XnIndexConfigurationModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';

  const formSchema = yupObject({
    labMachineIndexCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    labMachineIndexName: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    labMachineTypeCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    labMachineCode: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required(t('Please_enter_this_field'))
      .nullable(),
    labMachineIndexCodeMapping: Yup.string()
      .required(t('Please_enter_this_field'))
      .nullable(),
  });
  const formControl = useFormik<TXnIndexConfiguration>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TXnIndexConfiguration) => {
      try {
        if (modalType === 'add') {
          const res =
            await xnIndexConfigurationApi.createXnIndexConfiguration(data);
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
            await xnIndexConfigurationApi.updateXnIndexConfiguration(data);
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
  const handleChange = (key: keyof TXnIndexConfiguration, value: any) => {
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
      name: 'labMachineIndexCode',
      key: 'labMachineIndexCode',
      label: t('May_XN'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.labMachineIndexCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineIndexCode', e.target.value);
      },
    },
    {
      name: 'labMachineIndexName',
      key: 'labMachineIndexName',
      label: t('E.Ten_chi_so_may'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineIndexName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineIndexName', e.target.value);
      },
    },
    {
      name: 'labMachineTypeCode',
      key: 'labMachineTypeCode',
      label: t('Ma_CS_máy'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineTypeCode', e.target.value);
      },
    },
    {
      name: 'labMachineCode',
      key: 'labMachineCode',
      label: t('Chi_so_may_mo_rong'),
      type: TYPE_FIELD.TEXT,
      disabled: isDisable,
      value: formControl.values.labMachineCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('labMachineCode', e.target.value);
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
              ? t('Configure_tester_indicators')
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

export default XnIndexConfigurationModal;
