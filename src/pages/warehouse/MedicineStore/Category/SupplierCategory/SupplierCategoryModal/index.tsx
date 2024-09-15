import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TSupplierCategory,
  TSupplierCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import SupplierCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/supplierCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddSupplier {
  show: boolean;
  modalType: TSupplierCategoryModal;
  SupplierCategory: TSupplierCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TSupplierCategory = {
  id: null,
  nccId: 0,
  nccName: '',
  diaChi: '',
  lienHe: '',
  ghiChu: '',
};

const SupplierCategoryModal = ({
  show,
  modalType,
  SupplierCategory,
  onHide,
  onSuccess,
}: AddSupplier) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();

  const formSchema = yupObject({
    // nccId: Yup.number()
    //   .min(0, 'Please enter positive number')
    //   .required(t('Please enter supplier id'))
    //   .nullable(),
    diaChi: Yup.string().required(t('Please enter address')).nullable(),
    lienHe: Yup.string().required(t('Please enter contact')).nullable(),
    ghiChu: Yup.string().required(t('Please enter note')).nullable(),
    nccName: Yup.string().required(t('Please enter supplier name')).nullable(),
  });
  const formControl = useFormik<TSupplierCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TSupplierCategory) => {
      try {
        if (modalType === 'edit') {
          const res = await SupplierCategoryApi.updateSupplier(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await SupplierCategoryApi.createSupplier(data);
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
  const handleChange = (key: keyof TSupplierCategory, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  const handleResetForm = () => {
    formControl.resetForm();
  };
  useEffect(() => {
    if (modalType === 'edit' && SupplierCategory) {
      formControl.setValues(SupplierCategory);
      handleResetForm();
    }
    if (modalType === 'add' && SupplierCategory) {
      handleResetForm();
    }
  }, [modalType, SupplierCategory]);
  const inputs: InputProps[] = [
    {
      label: t('Supplier name'),
      name: 'nccName',
      key: 'nccName',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.nccName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nccName', e.target.value);
      },
    },
    {
      label: t('Address'),
      name: 'diaChi',
      key: 'diaChi',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.diaChi,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('diaChi', e.target.value);
      },
    },
    {
      label: t('Contact'),
      name: 'lienHe',
      key: 'lienHe',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.lienHe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('lienHe', e.target.value);
      },
    },
    {
      label: t('Note'),
      name: 'ghiChu',
      key: 'ghiChu',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.ghiChu,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('ghiChu', e.target.value);
      },
    },
  ];
  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? 'Thêm nhà cung cấp'
              : modalType === 'edit'
                ? 'Chỉnh sửa nhà cung cấp'
                : 'Xem nhà cung cấp'}
          </Typography.Title>
        }
        footer
        width={1000}
      >
        <Space direction='vertical' className='d-flex'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 8 }}
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

export default SupplierCategoryModal;
