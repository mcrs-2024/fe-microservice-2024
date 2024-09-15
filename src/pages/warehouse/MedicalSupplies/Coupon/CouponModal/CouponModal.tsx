import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { STATUS } from 'src/constants/dumb/couponForm';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { ChapterModalType } from 'src/constants/types/category/chapter';
import {
  TCouponForm,
  TCouponFormModal,
} from 'src/constants/types/categoryWarehouseSupplier/couponForm';
import { TListOfWarehouseSupplier } from 'src/constants/types/categoryWarehouseSupplier/listOfWarehouseSuppliers';
import {
  TSupplierCategory,
  TWarehouseMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import couponFormApi from 'src/helpers/api/warehouseSupplier/couponForm';
import { useGetAllListOfWarehouse } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import { numberOnly, textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddCouponForm {
  show: boolean;
  modalType: TCouponFormModal;
  couponForm: TCouponForm | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TCouponForm = {
  id: null,
  couponCode: null,
  headline: null,
  importWarehouse: null,
  exportWarehouse: null,
  invoiceNumber: null,
  suppliers: null,
  toDate: null,
  fromDate: null,
  totalMoney: null,
  status: null,
};

const CouponModal = ({
  show,
  modalType,
  couponForm,
  onHide,
  onSuccess,
}: AddCouponForm) => {
  const { t } = useTranslation();
  const { data: warehouses } = useGetAllListOfWarehouse();
  const formSchema = yupObject({
    couponCode: Yup.string()
      // .max(20, t('Too_long'))
      .required(t('Please_enter_the_coupon_code'))
      .nullable(),
    headline: textOnly
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_headline'))
      .nullable(),
    importWarehouse: Yup.string()
      .required(t('Please_select_the_warehouse'))
      .nullable(),
    exportWarehouse: Yup.string()
      .required(t('Please_select_the_warehouse'))
      .nullable(),
    invoiceNumber: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_order_number'))
      .nullable(),
    toDate: Yup.string().required(t('Please_select_the_entry_date')).nullable(),
    fromDate: Yup.string()
      .required(t('Please_select_the_exit_date'))
      .nullable(),
    totalMoney: numberOnly
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_total_amount'))
      .nullable(),
  });

  const formControl = useFormik<TCouponForm>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TCouponForm) => {
      try {
        if (modalType === 'edit' && couponForm) {
          const res = await couponFormApi.updateCouponForm(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await couponFormApi.createCouponForm(data);
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
  const handleChange = (key: keyof TCouponForm, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  const handleResetForm = () => {
    formControl.resetForm();
  };
  useEffect(() => {
    if (modalType === 'edit' && couponForm) {
      handleResetForm();
      formControl.setValues(couponForm);
    }
    if (modalType === 'add' && couponForm) {
      handleResetForm();
    }
  }, [modalType, couponForm]);
  const inputs: InputProps[] = [
    {
      label: t('Coupon_code'),
      name: 'couponCode',
      key: 'couponCode',
      value: formControl.values.couponCode,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('couponCode', e.target.value);
      },
    },
    {
      label: t('Headline'),
      name: 'headline',
      key: 'headline',
      value: formControl.values.headline,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('headline', e.target.value);
      },
    },
    {
      label: t('importWarehouse'),
      name: 'importWarehouse',
      key: 'importWarehouse',
      value: formControl.values.importWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map((warehouse: TListOfWarehouseSupplier) => ({
        value: warehouse.id ?? '',
        label: warehouse.tenKho ?? '',
      })),
      onChange: (value: string) => {
        handleChange('importWarehouse', value);
      },
    },
    {
      label: t('exportWarehouse'),
      name: 'exportWarehouse',
      key: 'exportWarehouse',
      value: formControl.values.exportWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map((warehouse: TListOfWarehouseSupplier) => ({
        value: warehouse.id ?? '',
        label: warehouse.tenKho ?? '',
      })),
      onChange: (value: string) => {
        handleChange('exportWarehouse', value);
      },
    },
    {
      label: t('invoiceNumber'),
      name: 'invoiceNumber',
      key: 'invoiceNumber',
      value: formControl.values.invoiceNumber,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('invoiceNumber', e.target.value);
      },
    },
    {
      label: t('fromDate'),
      name: 'fromDate',
      key: 'fromDate',
      value: formControl.values.fromDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('fromDate', dateString);
      },
    },
    {
      label: t('toDate'),
      name: 'toDate',
      key: 'toDate',
      value: formControl.values.toDate,
      require: true,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('toDate', dateString);
      },
    },
    {
      label: t('totalMoney'),
      name: 'totalMoney',
      key: 'totalMoney',
      value: formControl.values.totalMoney,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('totalMoney', e.target.value);
      },
    },
    {
      label: t('Supplier'),
      name: 'suppliers',
      key: 'suppliers',
      value: formControl.values.suppliers,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('suppliers', e.target.value);
      },
    },
    {
      label: t('status'),
      name: 'statusCouponForm',
      key: 'status',
      value: formControl.values.status,
      require: true,
      type: TYPE_FIELD.SELECT,
      options: STATUS,
      onChange: (value: number) => {
        handleChange('status', value);
      },
    },
  ];
  console.log('test: ', formControl.errors);
  return (
    <>
      <Modal
        open={show}
        onCancel={onHide}
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_Import_Voucher')
              : modalType === 'edit'
                ? t('Edit_Import_Voucher')
                : t('View_Import_Voucher')}
          </Typography.Title>
        }
        footer
        width={600}
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

export default CouponModal;
