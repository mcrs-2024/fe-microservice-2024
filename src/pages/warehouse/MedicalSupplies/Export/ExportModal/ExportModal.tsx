import { ChangeEvent, HTMLInputTypeAttribute, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { STATUS } from 'src/constants/dumb/couponForm';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TExportForm,
  TExportFormModal,
} from 'src/constants/types/categoryWarehouseSupplier/exportForm';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import exportFormApi from 'src/helpers/api/medicineStore/export';
import { useGetAllListOfWarehouse } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/listOfWarehouseSupplier';
import { numberOnly, textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddExportForm {
  show: boolean;
  modalType: TExportFormModal;
  exportForm: TExportForm | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TExportForm = {
  id: null,
  couponCode: null,
  headline: null,
  importWarehouse: null,
  exportWarehouse: null,
  invoiceNumber: null,
  fromDate: null,
  status: null,
  toDate: null,
  totalMoney: null,
};

const ExportModal = ({
  show,
  modalType,
  exportForm,
  onHide,
  onSuccess,
}: AddExportForm) => {
  const { t } = useTranslation();
  const { data: warehouses } = useGetAllListOfWarehouse();

  const formSchema = yupObject({
    couponCode: Yup.string()
      .max(20, t('Too_long'))
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

  const formControl = useFormik<TExportForm>({
    initialValues: defaultValue,
    validationSchema: formSchema,

    onSubmit: async (data: TExportForm) => {
      try {
        if (modalType === 'edit' && exportForm) {
          const res = await exportFormApi.updateExportForm(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await exportFormApi.createExportForm(data);
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
  const handleChange = (key: keyof TExportForm, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  useEffect(() => {
    if (modalType === 'edit' && exportForm) {
      formControl.setValues(exportForm);
    }
    if (modalType === 'add' && exportForm) {
      //
    }
  }, [modalType, exportForm]);
  const inputs: InputProps[] = [
    {
      label: t('Coupon code'),
      name: 'couponCode',
      key: 'couponCode',
      require: true,
      value: formControl.values.couponCode,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('couponCode', e.target.value);
      },
    },
    {
      label: t('Headline'),
      name: 'headline',
      key: 'headline',
      require: true,
      value: formControl.values.headline,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('headline', e.target.value);
      },
    },
    {
      label: t('importWarehouse'),
      name: 'importWarehouse',
      key: 'importWarehouse',
      require: true,
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
      label: t('exportWarehouse'),
      name: 'exportWarehouse',
      key: 'exportWarehouse',
      require: true,
      value: formControl.values.exportWarehouse,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('exportWarehouse', value);
      },
    },
    {
      label: t('invoiceNumber'),
      name: 'invoiceNumber',
      key: 'invoiceNumber',
      require: true,
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
      require: true,
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
      require: true,
      value: formControl.values.toDate,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('toDate', dateString);
      },
    },
    {
      label: t('totalMoney'),
      name: 'totalMoney',
      key: 'totalMoney',
      require: true,
      value: formControl.values.totalMoney,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('totalMoney', e.target.value);
      },
    },
    {
      label: t('status'),
      name: 'statusExport',
      key: 'status',
      value: formControl.values.status,
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
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'view'
              ? t('View export form')
              : t('View export form')}
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

export default ExportModal;
