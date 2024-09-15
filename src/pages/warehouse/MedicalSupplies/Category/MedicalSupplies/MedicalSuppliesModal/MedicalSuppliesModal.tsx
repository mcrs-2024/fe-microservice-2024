import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TFirm } from 'src/constants/types/categoryWarehouseSupplier/firm';
import {
  MedicalSuppliesModalType,
  TMedicalSupplies,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSupplies';
import { TMedicalSuppliesGroup } from 'src/constants/types/categoryWarehouseSupplier/medicalSuppliesGroup';
import { TRegulation } from 'src/constants/types/categoryWarehouseSupplier/regulations';
import { useGetAllFirm } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/firm';
import medicalSuppliesApi from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSupplies';
import { useGetAllMedicalSuppliesGroup } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSuppliesGroup';
import { useGetAllRegulation } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/regulations';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMedicalSupplies {
  show: boolean;
  modalType: MedicalSuppliesModalType;
  data: TMedicalSupplies | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TMedicalSupplies = {
  id: null,
  description: null,
  donViApKQDTId: null,
  donViTINHId: null,
  giaTriBHChiTra: null,
  hangSanXUATId: null,
  maBaoHiem: null,
  maHang: null,
  nhaThau: null,
  nhomTCKT: null,
  nhomVTYTId: null,
  nuocSanXUATId: null,
  quyCachId: null,
  tenTheoBaoHiem: null,
  tenTheoThuongMai: null,
  maNhomBaoHiem: null,
};

const MedicalSuppliesModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddMedicalSupplies) => {
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const { data: regulations } = useGetAllRegulation();
  const { data: medicalSuppliesGroups } = useGetAllMedicalSuppliesGroup();
  const { data: suppliers } = useGetAllFirm();
  const formSchema = yupObject({
    donViApKQDTId: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_unit_code_for_KQDT'))
      .nullable(),
    donViTINHId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_unit_code_for_TINH'))
      .nullable(),
    giaTriBHChiTra: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_insurance_value'))
      .nullable(),
    hangSanXUATId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_manufacturer_code'))
      .nullable(),
    maBaoHiem: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_insurance_code'))
      .nullable(),
    maHang: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_brand_code'))
      .nullable(),
    nhaThau: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_contractor'))
      .nullable(),
    quyCachId: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_choose_the_regulation'))
      .nullable(),
    nhomTCKT: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_TCKT_group'))
      .nullable(),
    nhomVTYTId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_VTYT_group_code'))
      .nullable(),
    nuocSanXUATId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_country_of_manufacture_code'))
      .nullable(),
    tenTheoBaoHiem: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_insurance_name'))
      .nullable(),
    tenTheoThuongMai: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_commercial_name'))
      .nullable(),
    maNhomBaoHiem: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_insurance_group_code'))
      .nullable(),
  });

  const formControl = useFormik<TMedicalSupplies>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TMedicalSupplies) => {
      try {
        if (modalType === 'edit' && data) {
          const res = await medicalSuppliesApi.updateMedicalSupplies(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await medicalSuppliesApi.createMedicalSupplies(data);
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

  const handleChange = (key: keyof TMedicalSupplies, value: any) => {
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
      label: t('maBaoHiem'),
      name: 'maBaoHiem',
      key: 'maBaoHiem',
      allowClear: true,
      require: true,
      value: formControl.values.maBaoHiem,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maBaoHiem', e.target.value);
      },
    },
    {
      label: t('tenTheoBaoHiem'),
      name: 'tenTheoBaoHiem',
      key: 'tenTheoBaoHiem',
      allowClear: true,
      require: true,
      value: formControl.values.tenTheoBaoHiem,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenTheoBaoHiem', e.target.value);
      },
    },
    {
      label: t('tenTheoThuongMai'),
      name: 'tenTheoThuongMai',
      key: 'tenTheoThuongMai',
      allowClear: true,
      require: true,
      value: formControl.values.tenTheoThuongMai,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenTheoThuongMai', e.target.value);
      },
    },
    {
      label: t('maHang'),
      name: 'maHang',
      key: 'maHang',
      allowClear: true,
      require: true,
      value: formControl.values.maHang,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maHang', e.target.value);
      },
    },
    {
      label: t('nhomVTYTId'),
      name: 'nhomVTYTId',
      key: 'nhomVTYTId',
      allowClear: true,
      require: true,
      value: formControl.values.nhomVTYTId,
      type: TYPE_FIELD.SELECT,
      options: medicalSuppliesGroups?.data?.map(
        (medicalSuppliesGroup: TMedicalSuppliesGroup) => ({
          value: medicalSuppliesGroup.id ?? '',
          label: medicalSuppliesGroup.name ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('nhomVTYTId', value);
      },
    },
    {
      label: t('hangSanXUATId'),
      name: 'hangSanXUATId',
      key: 'hangSanXUATId',
      allowClear: true,
      require: true,
      value: formControl.values.hangSanXUATId,
      type: TYPE_FIELD.SELECT,
      options: suppliers?.data?.map((supplier: TFirm) => ({
        value: supplier.id ?? '',
        label: supplier.tenSanPham ?? '',
      })),
      onChange: (value: string | null) => {
        handleChange('hangSanXUATId', value);
      },
    },
    {
      label: t('quyCachId'),
      name: 'quyCachId',
      key: 'quyCachId',
      allowClear: true,
      require: true,
      value: formControl.values.quyCachId,
      type: TYPE_FIELD.SELECT,
      options: regulations?.data?.map((regulation: TRegulation) => ({
        value: regulation.id ?? '',
        label: regulation.name ?? '',
      })),
      onChange: (value: string | null) => {
        handleChange('quyCachId', value);
      },
    },
    {
      label: t('giaTriBHChiTra'),
      name: 'giaTriBHChiTra',
      key: 'giaTriBHChiTra',
      allowClear: true,
      require: true,
      value: formControl.values.giaTriBHChiTra,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('giaTriBHChiTra', e.target.value);
      },
    },
    {
      label: t('nhaThau'),
      name: 'nhaThau',
      key: 'nhaThau',
      allowClear: true,
      require: true,
      value: formControl.values.nhaThau,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhaThau', e.target.value);
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
    {
      label: t('donViApKQDTId'),
      name: 'donViApKQDTId',
      key: 'donViApKQDTId',
      allowClear: true,
      require: true,
      value: formControl.values.donViApKQDTId,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donViApKQDTId', e.target.value);
      },
    },
    {
      label: t('donViTINHId'),
      name: 'donViTINHId',
      key: 'donViTINHId',
      allowClear: true,
      require: true,
      value: formControl.values.donViTINHId,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donViTINHId', e.target.value);
      },
    },
    {
      label: t('maNhomBaoHiem'),
      name: 'maNhomBaoHiem',
      key: 'maNhomBaoHiem',
      allowClear: true,
      require: true,
      value: formControl.values.maNhomBaoHiem,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maNhomBaoHiem', e.target.value);
      },
    },
    {
      label: t('nhomTCKT'),
      name: 'nhomTCKT',
      key: 'nhomTCKT',
      allowClear: true,
      require: true,
      value: formControl.values.nhomTCKT,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhomTCKT', e.target.value);
      },
    },
    {
      label: t('nuocSanXUATId'),
      name: 'nuocSanXUATId',
      key: 'nuocSanXUATId',
      allowClear: true,
      require: true,
      value: formControl.values.nuocSanXUATId,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nuocSanXUATId', e.target.value);
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
              ? t('AddMedicalSupplies')
              : modalType === 'edit'
                ? t('EditMedicalSupplies')
                : t('ViewMedicalSupplies')}
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
export default MedicalSuppliesModal;
