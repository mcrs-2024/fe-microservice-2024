import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  FirmModalType,
  TFirm,
} from 'src/constants/types/categoryWarehouseSupplier/firm';
import firmApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/firm';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddFirm {
  show: boolean;
  modalType: FirmModalType;
  data: TFirm | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TFirm = {
  id: null,
  maSoSp: null,
  tenSanPham: null,
  ghiChu: null,
};

const FirmModal = ({ show, modalType, data, onHide, onSuccess }: AddFirm) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    maSoSp: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Vui lòng nhập mã số sản phẩm'))
      .nullable(),
    tenSanPham: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Vui lòng nhập tên sản phẩm'))
      .nullable(),
  });
  const formControl = useFormik<TFirm>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TFirm) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await firmApi.updateFirm(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await firmApi.createFirm(data);
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

  const handleChange = (key: keyof TFirm, value: any) => {
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
      label: t('maSoSp'),
      name: 'maSoSp',
      allowClear: true,
      require: true,
      value: formControl.values.maSoSp,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maSoSp', e.target.value);
      },
    },
    {
      label: t('tenSanPham'),
      name: 'tenSanPham',
      allowClear: true,
      require: true,
      value: formControl.values.tenSanPham,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenSanPham', e.target.value);
      },
    },
    {
      label: t('ghiChu'),
      name: 'ghiChu',
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
              ? t('AddFirm')
              : modalType === 'edit'
                ? t('EditFirm')
                : t('ViewFirm')}
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
export default FirmModal;
