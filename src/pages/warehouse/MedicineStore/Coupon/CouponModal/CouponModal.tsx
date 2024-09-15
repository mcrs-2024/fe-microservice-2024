import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { STATUS } from 'src/constants/dumb/couponForm';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TSupplierCategory,
  TWarehouseMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import {
  TCoupon,
  TCouponModal,
} from 'src/constants/types/registration/phieuNhap';
import { useGetAllSupplier } from 'src/helpers/api/medicineStore/medicineStoreCategory/supplierCategory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import couponApi from 'src/helpers/api/medicineStore/phieuNhap';
import { textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';
interface AddCoupon {
  show: boolean;
  modalType: TCouponModal;
  coupon: TCoupon | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TCoupon = {
  id: null,
  couponCode: null,
  headline: null,
  importWarehouse: null,
  suppliers: null,
  invoiceNumber: null,
  fromDate: null,
  toDate: null,
  status: null,
  totalMoney: null,
};

const CouponModal = ({
  show,
  modalType,
  coupon,
  onHide,
  onSuccess,
}: AddCoupon) => {
  const { t } = useTranslation();
  const { data: suppliers } = useGetAllSupplier();
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();

  const formSchema = yupObject({
    couponCode: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_coupon_code'))
      .nullable(),
    headline: textOnly.required(t('Please_enter_the_headline')).nullable(),
    importWarehouse: Yup.string()
      .required(t('Please_select_the_warehouse'))
      .nullable(),
    suppliers: Yup.string()
      .required(t('Please_select_the_supplier'))
      .nullable(),
    invoiceNumber: Yup.string()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_order_number'))
      .nullable(),
    fromDate: Yup.string()
      .required(t('Please_select_the_entry_date'))
      .nullable(),
    toDate: Yup.string().required(t('Please_select_the_exit_date')).nullable(),
    totalMoney: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_total_amount'))
      .nullable(),
  });

  const formControl = useFormik<TCoupon>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TCoupon) => {
      try {
        if (modalType === 'edit' && coupon) {
          const res = await couponApi.updateCoupon(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await couponApi.createCoupon(data);
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
  const handleChange = (key: keyof TCoupon, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  const handleResetForm = () => {
    formControl.resetForm();
  };
  useEffect(() => {
    if (modalType === 'edit' && coupon) {
      formControl.setValues(coupon);
    }
    if (modalType === 'add' && coupon) {
      handleResetForm();
    }
  }, [modalType, coupon]);
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
      label: t('Warehouse'),
      name: 'importWarehouse',
      key: 'importWarehouse',
      value: formControl.values.importWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('importWarehouse', value);
      },
    },
    {
      label: t('Supplier'),
      name: 'suppliers',
      key: 'suppliers',
      value: formControl.values.suppliers,
      type: TYPE_FIELD.SELECT,
      options: suppliers?.data.map((supplier: TSupplierCategory) => ({
        value: supplier.id ?? '',
        label: supplier.nccName ?? '',
      })),
      onChange: (value: string | null) => {
        handleChange('suppliers', value);
      },
    },
    {
      label: t('Order_Code'),
      name: 'invoiceNumber',
      key: 'invoiceNumber',
      value: formControl.values.invoiceNumber,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('invoiceNumber', e.target.value);
      },
    },
    {
      label: t('Date_of_import'),
      name: 'fromDate',
      key: 'fromDate',
      value: formControl.values.fromDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('fromDate', dateString);
      },
    },
    {
      label: t('Date_of_export'),
      name: 'toDate',
      key: 'toDate',
      value: formControl.values.toDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('toDate', dateString);
      },
    },
    {
      label: t('Total_Amount'),
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
      label: t('status'),
      name: 'StatusCouponForm',
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

export default CouponModal;
