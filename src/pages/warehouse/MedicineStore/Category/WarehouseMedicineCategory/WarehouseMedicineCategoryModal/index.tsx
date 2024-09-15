import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TWarehouseMedicineCategory,
  TWarehouseMedicineCategoryModel,
} from 'src/constants/types/medicineStore/medicineCategory';
import warehouseMedicineCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddProps {
  show: boolean;
  modalType: TWarehouseMedicineCategoryModel;
  data: TWarehouseMedicineCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TWarehouseMedicineCategory = {
  id: null,
  tenKho: null,
  moTa: null,
};

const WarehouseMedicineCategoryModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddProps) => {
  const { t } = useTranslation();
  const isDisable = modalType === 'edit';

  const formSchema = yupObject({
    tenKho: Yup.string().required(t('Please enter warehouse name')),
    //maKho: Yup.string().required('Vui lòng nhập mã kho'),
    moTa: Yup.string().required(t('Please enter description')),
  });

  const formControl = useFormik<TWarehouseMedicineCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TWarehouseMedicineCategory) => {
      console.log('data: ', data);
      try {
        if (modalType === 'edit' && data) {
          const res =
            await warehouseMedicineCategoryApi.updateWarehouseMedicine(data);
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
            await warehouseMedicineCategoryApi.createWarehouseMedicine(data);
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

  const handleChange = (key: keyof TWarehouseMedicineCategory, value: any) => {
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
      handleResetForm();
      formControl.setValues(data);
    }
    if (modalType === 'add' && data) {
      handleResetForm();
    }
  }, [modalType, data]);

  const inputs: InputProps[] = [
    {
      label: 'ID',
      name: 'id',
      key: 'id',
      type: TYPE_FIELD.TEXT,
      disabled: isDisable || modalType === 'add',
      value: formControl.values.id,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('id', e.target.value);
      },
    },
    {
      label: t('warehouseName'),
      name: 'tenKho',
      key: 'tenKho',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tenKho,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenKho', e.target.value);
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
              ? 'Thêm kho dược'
              : modalType === 'edit'
                ? 'Sửa kho dược'
                : 'Xem kho dược'}
          </Typography.Title>
        }
        footer
        width={800}
      >
        <Space direction='vertical'>
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

export default WarehouseMedicineCategoryModal;
