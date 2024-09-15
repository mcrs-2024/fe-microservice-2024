import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  RegulationModalType,
  TRegulation,
} from 'src/constants/types/categoryWarehouseSupplier/regulations';
import regulationApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/regulations';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddRegulation {
  show: boolean;
  modalType: RegulationModalType;
  data: TRegulation | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TRegulation = {
  id: null,
  name: null,
  description: null,
};

const RegulationModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddRegulation) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    name: Yup.string()
      .max(20, 'Too_long')
      .required(t('Please_enter_the_name_of_regulation'))
      .nullable(),
  });
  const formControl = useFormik<TRegulation>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TRegulation) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await regulationApi.updateRegulation(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await regulationApi.createRegulation(data);
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

  const handleChange = (key: keyof TRegulation, value: any) => {
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
      label: t('nameRegulation'),
      name: 'name',
      key: 'name',
      allowClear: true,
      value: formControl.values.name,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('name', e.target.value);
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
              ? t('AddRegulation')
              : modalType === 'edit'
                ? t('EditRegulation')
                : t('ViewRegulation')}
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
export default RegulationModal;
