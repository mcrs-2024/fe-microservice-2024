import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TMedicineGroupCategory,
  TMedicineGroupCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import medicineGroupCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineGroupCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMedicineGroup {
  show: boolean;
  modalType: TMedicineGroupCategoryModal;
  data: TMedicineGroupCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TMedicineGroupCategory = {
  id: null,
  maLoaiThuoc: null,
  tenNhomThuoc: '',
  moTa: '',
  createdBy: '',
};

const MedicineGroupCategoryModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddMedicineGroup) => {
  const isDisable = modalType === 'add';
  const { t } = useTranslation();

  const formSchema = yupObject({
    maLoaiThuoc: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please enter Type code'))
      .nullable(),
    tenNhomThuoc: Yup.string()
      .required(t('Please enter Drug type name'))
      .nullable(),
    moTa: Yup.string().required(t('Please enter Description')).nullable(),
    createdBy: Yup.string().required(t('Please enter Created by')).nullable(),
  });
  const formControl = useFormik<TMedicineGroupCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TMedicineGroupCategory) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await medicineGroupCategoryApi.updateMedicineGroup(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await medicineGroupCategoryApi.createMedicineGroup(data);
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
  const handleChange = (key: keyof TMedicineGroupCategory, value: any) => {
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
      //
    }
  }, [modalType, data]);
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
      label: t('Name of group of medicine'),
      name: 'tenNhomThuoc',
      key: 'tenNhomThuoc',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tenNhomThuoc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenNhomThuoc', e.target.value);
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
              ? 'Thêm loại nhóm thuốc'
              : modalType === 'edit'
                ? 'Chỉnh sửa nhóm thuốc'
                : 'Xem loại nhóm thuốc'}
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

export default MedicineGroupCategoryModal;
