import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  ListOfWarehouseSupplierModal,
  TListOfWarehouseSupplier,
} from 'src/constants/types/categoryWarehouseSupplier/listOfWarehouseSuppliers';
import listOfWarehouseCategoryApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import { textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddListOfWarehouseSupplier {
  show: boolean;
  modalType: ListOfWarehouseSupplierModal;
  data: TListOfWarehouseSupplier | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TListOfWarehouseSupplier = {
  id: null,
  tenKho: '',
  moTa: '',
};

const ListOfWarehouseSupllierModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddListOfWarehouseSupplier) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    tenKho: textOnly
      .max(150, t('Too_Long'))
      .required(t('Please_enter_the_warehouse_name'))
      .nullable(),
    moTa: Yup.string().nullable(),
  });
  const formControl = useFormik<TListOfWarehouseSupplier>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TListOfWarehouseSupplier) => {
      try {
        if (modalType === 'edit' && data) {
          const res =
            await listOfWarehouseCategoryApi.updateListOfWarehouseCategory(
              data,
            );
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res =
            await listOfWarehouseCategoryApi.createListOfWarehouseCategory(
              data,
            );
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

  const handleResetForm = () => {
    formControl.resetForm();
  };

  const handleChange = (key: keyof TListOfWarehouseSupplier, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
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
      label: t('tenKho'),
      name: 'tenKho',
      key: 'tenKho',
      allowClear: true,
      require: true,
      value: formControl.values.tenKho,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenKho', e.target.value);
      },
    },
    {
      label: t('moTa'),
      name: 'moTa',
      key: 'moTa',
      allowClear: true,
      value: formControl.values.moTa,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moTa', e.target.value);
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
              ? t('AddListOfWarehouseSupplier')
              : modalType === 'edit'
                ? t('EditListOfWarehouseSupplier')
                : t('ViewListOfWarehouseSupplier')}
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
export default ListOfWarehouseSupllierModal;
