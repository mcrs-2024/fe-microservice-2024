import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TMedicineTypeCategory,
  TMedicineTypeCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import medicineTypeCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineTypeCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMedicineTypeCategory {
  show: boolean;
  modalType: TMedicineTypeCategoryModal;
  MedicineTypeCategory: TMedicineTypeCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TMedicineTypeCategory = {
  id: null,
  maLoaiThuoc: null,
  tenLoaiThuoc: '',
  moTa: '',
  createdBy: '',
};

const MedicineTypeCategoryModal = ({
  show,
  modalType,
  MedicineTypeCategory,
  onHide,
  onSuccess,
}: AddMedicineTypeCategory) => {
  const isDisable = modalType === 'add';
  const { t } = useTranslation();
  const formSchema = yupObject({
    maLoaiThuoc: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please enter Type code'))
      .nullable(),
    tenLoaiThuoc: Yup.string()
      .required(t('Please enter Drug type name'))
      .nullable(),
    moTa: Yup.string().required(t('Please enter Description')).nullable(),
    createdBy: Yup.string().required(t('Please enter Created by')).nullable(),
  });
  const formControl = useFormik<TMedicineTypeCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TMedicineTypeCategory) => {
      try {
        if (modalType === 'edit') {
          const res = await medicineTypeCategoryApi.updateMedicineType(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await medicineTypeCategoryApi.createMedicineType(data);
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
  const handleChange = (key: keyof TMedicineTypeCategory, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  useEffect(() => {
    if (modalType === 'edit' && MedicineTypeCategory) {
      formControl.setValues(MedicineTypeCategory);
    }
    if (modalType === 'add' && MedicineTypeCategory) {
      //
    }
  }, [modalType, MedicineTypeCategory]);
  const inputs: InputProps[] = [
    {
      label: t('Type_of_Medicine_ID'),
      name: 'maLoaiThuoc',
      key: 'maLoaiThuoc',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.maLoaiThuoc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maLoaiThuoc', e.target.value);
      },
    },
    {
      label: t('Name type of medicine'),
      name: 'tenLoaiThuoc',
      key: 'tenLoaiThuoc',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tenLoaiThuoc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenLoaiThuoc', e.target.value);
      },
    },
    {
      label: t('description'),
      name: 'moTa',
      key: 'moTa',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.moTa,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('moTa', e.target.value);
      },
    },
    {
      label: t('Created by'),
      name: 'createdBy',
      key: 'createdBy',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.createdBy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('createdBy', e.target.value);
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
              ? 'Thêm loại thuốc'
              : modalType === 'edit'
                ? 'Chỉnh sửa loại thuốc'
                : 'Xem loại thuốc'}
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

export default MedicineTypeCategoryModal;
