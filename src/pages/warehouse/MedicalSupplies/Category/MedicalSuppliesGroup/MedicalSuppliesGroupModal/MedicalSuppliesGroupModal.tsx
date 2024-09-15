import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  MedicalSuppliesGroupModalType,
  TMedicalSuppliesGroup,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSuppliesGroup';
import medicalSuppliesGroupApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSuppliesGroup';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMedicalSuppliesGroup {
  show: boolean;
  modalType: MedicalSuppliesGroupModalType;
  data: TMedicalSuppliesGroup | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TMedicalSuppliesGroup = {
  id: null,
  name: null,
  ghiChu: null,
};

const MedicalSuppliesGroupModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddMedicalSuppliesGroup) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    name: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_medical_supplier_group'))
      .nullable(),
  });
  const formControl = useFormik<TMedicalSuppliesGroup>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TMedicalSuppliesGroup) => {
      try {
        if (modalType === 'edit' && data) {
          const res =
            await medicalSuppliesGroupApi.updateMedicalSuppliesGroup(data);
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
            await medicalSuppliesGroupApi.createMedicalSuppliesGroup(data);
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

  const handleChange = (key: keyof TMedicalSuppliesGroup, value: any) => {
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
      label: t('name'),
      name: 'name',
      key: 'name',
      allowClear: true,
      value: formControl.values.name,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('name', e.target.value);
      },
    },
    {
      label: t('ghiChu'),
      name: 'ghiChu',
      key: 'ghiChu',
      allowClear: true,
      value: formControl.values.ghiChu,
      type: TYPE_FIELD.TEXT,
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
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('AddMedicalSuppliesGroup')
              : modalType === 'edit'
                ? t('EditMedicalSuppliesGroup')
                : t('ViewMedicalSuppliesGroup')}
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
export default MedicalSuppliesGroupModal;
