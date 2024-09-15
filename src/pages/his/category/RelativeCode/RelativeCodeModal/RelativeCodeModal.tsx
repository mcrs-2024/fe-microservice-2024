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
  RelativeCodeModalType,
  TRelativeCode,
} from 'src/constants/types/his/category/relativeCode';
import { TRelativeCodeType } from 'src/constants/types/his/category/relativeTypeCode';
import relativeCodeApi from 'src/helpers/api/his/category/relativeCode';
import { useGetAllRelativeTypeCode } from 'src/helpers/api/his/category/relativeTypeCode';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface Props {
  isShow: boolean;
  modalType: RelativeCodeModalType;
  selectedRecord: TRelativeCode | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TRelativeCode = {
  id: '',
  relativeTypeId: '',
  relativeCode: '',
  relativeName: '',
  phone: '',
  birthday: '',
  street: '',
  provinceCode: '',
  districtCode: '',
  wardCode: '',
  seqNum: null,
};

const RelativeCodeModal = ({
  isShow,
  modalType,
  onHide,
  selectedRecord,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'view';
  const { data: relativeTypeCodes } = useGetAllRelativeTypeCode();

  const formSchema = yupObject({
    code: Yup.string()
      .max(20, t('Too_long_maximum_20_characters'))
      .required()
      .nullable(),
    name: Yup.string()
      .max(150, t('Too_long_maximum_150_characters'))
      .required()
      .nullable(),
  });

  const formControl = useFormik<TRelativeCode>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TRelativeCode) => {
      try {
        if (modalType === 'add') {
          const res = await relativeCodeApi.createRelativeCode(data);
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
          const res = await relativeCodeApi.updateRelativeCode(data);
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

  const handleChange = (key: keyof TRelativeCode, value: any) => {
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
      label: t('Relative_Code'),
      name: 'relativeCode',
      key: 'relativeCode',
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.relativeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relativeCode', e.target.value);
      },
    },
    {
      label: t('Relative_Name'),
      name: 'relativeName',
      key: 'relativeName',
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'edit',
      value: formControl.values.relativeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('relativeName', e.target.value);
      },
    },
    {
      label: t('Relative_Type'),
      name: 'relativeTypeId',
      key: 'relativeTypeId',
      type: TYPE_FIELD.SELECT,
      options: relativeTypeCodes?.data?.map((data: TRelativeCodeType) => ({
        value: data.id ?? null,
        label: data.relativeTypeName ?? null,
      })),
      value: formControl.values.relativeTypeId,
      onChange: (value: string) => {
        handleChange('relativeTypeId', value);
      },
    },
    {
      label: t('phone'),
      name: 'phone',
      key: 'phone',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.phone,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('phone', e.target.value);
      },
    },
    {
      label: t('birthday'),
      name: 'birthday',
      key: 'birthday',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.birthday,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('birthday', e.target.value);
      },
    },
    {
      label: t('street'),
      name: 'street',
      key: 'street',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.street,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('street', e.target.value);
      },
    },
    {
      label: t('provinceCode'),
      name: 'provinceCode',
      key: 'provinceCode',
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.provinceCode,
      onChange: (value: string) => {
        handleChange('provinceCode', value);
      },
    },
    {
      label: t('districtCode'),
      name: 'districtCode',
      key: 'districtCode',
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.districtCode,
      onChange: (value: string) => {
        handleChange('districtCode', value);
      },
    },
    {
      label: t('wardCode'),
      name: 'wardCode',
      key: 'wardCode',
      type: TYPE_FIELD.SELECT,
      options: [],
      value: formControl.values.wardCode,
      onChange: (value: string) => {
        handleChange('wardCode', value);
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
              ? t('Add_Relative_Code')
              : modalType === 'edit'
                ? t('Edit_Relative_Code')
                : t('View_Relative_Code')}
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

export default RelativeCodeModal;
