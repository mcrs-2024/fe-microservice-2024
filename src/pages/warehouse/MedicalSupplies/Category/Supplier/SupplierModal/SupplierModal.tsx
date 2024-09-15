import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  SupplierModalType,
  TSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/supplier';
import supplierApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/supplier';
import { numberOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddFirm {
  show: boolean;
  modalType: SupplierModalType;
  data: TSupplier | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TSupplier = {
  id: null,
  description: null,
  name: null,
  phone: null,
  address: null,
  email: null,
  representative: null,
};

const SupplierModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddFirm) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    phone: numberOnly.required(t('Please_enter_the_phone_number')).nullable(),
    name: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_name'))
      .nullable(),
    address: Yup.string().required(t('Please_enter_the_address')).nullable(),
    representative: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_representative'))
      .nullable(),
  });
  const formControl = useFormik<TSupplier>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TSupplier) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await supplierApi.updateSupplier(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await supplierApi.createSupplier(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleChange = (key: keyof TSupplier, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  const handleResetForm = () => {
    formControl.resetForm();
  };

  useEffect(() => {
    if (modalType === 'edit' && data) {
      formControl.setValues(data);
    }
    if (modalType === 'add' && data) {
      handleResetForm();
    }
  }, [modalType, data]);

  const input: InputProps[] = [
    {
      label: t('nameOfSupplier'),
      name: 'name',
      key: 'name',
      allowClear: true,
      require: true,
      value: formControl.values.name,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('name', e.target.value);
      },
    },
    {
      label: t('address'),
      name: 'address',
      key: 'address',
      allowClear: true,
      require: true,
      value: formControl.values.address,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('address', e.target.value);
      },
    },
    {
      label: t('representative'),
      name: 'representative',
      key: 'representative',
      allowClear: true,
      require: true,
      value: formControl.values.representative,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('representative', e.target.value);
      },
    },
    {
      label: t('phone'),
      name: 'phone',
      key: 'phone',
      allowClear: true,
      require: true,
      value: formControl.values.phone,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('phone', e.target.value);
      },
    },
    {
      label: t('email'),
      name: 'email',
      key: 'email',
      allowClear: true,
      value: formControl.values.email,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('email', e.target.value);
      },
    },
    {
      label: t('description'),
      name: 'description',
      key: 'description',
      allowClear: true,
      value: formControl.values.description,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
      },
    },
  ];
  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('AddSupplier')
              : modalType === 'edit'
                ? t('EditSupplier')
                : t('ViewSupplier')}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical' className='d-flex'>
          <InputFields
            inputs={input}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
            gutter={[0, 6]}
          ></InputFields>
          <Flex justify='end' gap={12}>
            <Button onClick={onHide}>Cancel</Button>
            <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
              Save
            </ButtonCustom.Edit>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};
export default SupplierModal;
