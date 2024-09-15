import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { NGUON_THUOC } from 'src/constants/dumb/inventory';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  InventoryModelType,
  TInventorySheet,
} from 'src/constants/types/medicineStore/inventorySheet';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import inventoryApi from 'src/helpers/api/medicineStore/inventory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddInventoryProps {
  show: boolean;
  modalType: InventoryModelType;
  inventory: TInventorySheet | null;
  onHide: () => void;
  onSuccess: () => void;
}

type FormValues = TInventorySheet;

const defaultValue: FormValues = {
  id: null,
  createdBy: null,
  createdDate: null,
  description: null,
  khoId: null,
  maPhieu: null,
  modifiedBy: null,
  modifiedDate: null,
  nguoiKiemKe: null,
  nguonThuoc: null,
  nguonThuocId: null,
  tieuDe: null,
  tongGiaTri: null,
  tinhTrang: null,
  tenKho: null,
};

const InventoryModal = ({
  show,
  modalType,
  inventory,
  onHide,
  onSuccess,
}: AddInventoryProps) => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const isDisable = modalType === 'view';
  const { t } = useTranslation();

  const formSchema = yupObject({
    maPhieu: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_voucher_code'))
      .nullable(),
    khoId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_warehouse_code'))
      .nullable(),
    tenKho: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_select_the_warehouse_name'))
      .nullable(),
    tieuDe: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_voucher_title'))
      .nullable(),
    nguonThuoc: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_select_the_source_of_medicine'))
      .nullable(),
    nguonThuocId: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_source_code'))
      .nullable(),
    tongGiaTri: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_total_value'))
      .nullable(),
    createdDate: Yup.string().required(t('Please_select_the_date')).nullable(),
    nguoiKiemKe: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_inventory_person'))
      .nullable(),
  });

  const formControl = useFormik<FormValues>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: FormValues) => {
      console.log('data: ', data);
      try {
        if (modalType === 'edit' && inventory) {
          const res = await inventoryApi.updateInventory(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await inventoryApi.createInventory(data);
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
        message.error(error);
      }
    },
  });

  const handleChange = (key: keyof FormValues, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  const handleResetForm = () => {
    formControl.resetForm();
  };

  useEffect(() => {
    if (modalType === 'edit' && inventory) {
      handleResetForm();
      formControl.setValues(inventory);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, inventory]);

  const inputs: InputProps[] = [
    {
      name: 'maPhieu',
      key: 'maPhieu',
      label: t('Inventory ID'),
      value: formControl.values.maPhieu,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maPhieu', e.target.value);
      },
    },
    {
      name: 'khoId',
      key: 'khoId',
      label: t('Warehouse_ID'),
      value: formControl.values.khoId,
      require: true,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('khoId', e.target.value);
      },
    },
    {
      name: 'tenKho',
      key: 'tenKho',
      label: t('warehouseName'),
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? null,
          label: warehouse.tenKho ?? null,
        }),
      ),
      value: formControl.values.tenKho,
      onChange: (value: string) => {
        handleChange('tenKho', value);
      },
    },
    {
      name: 'tieuDe',
      key: 'tieuDe',
      label: t('title'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.tieuDe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tieuDe', e.target.value);
      },
    },
    {
      name: 'nguonThuocId',
      key: 'nguonThuocId',
      label: t('medicineSourceId'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.nguonThuocId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nguonThuocId', e.target.value);
      },
    },
    {
      name: 'nguonThuoc',
      key: 'nguonThuoc',
      label: t('Source_of_medicine'),
      type: TYPE_FIELD.SELECT,
      options: NGUON_THUOC,
      value: formControl.values.nguonThuoc,
      onChange: (value: string) => {
        handleChange('nguonThuoc', value);
      },
    },
    {
      name: 'tinhTrang',
      key: 'tinhTrang',
      label: t('billStatus'),
      value: formControl.values.tinhTrang,
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      onChange: (value: number | null) => {
        handleChange('tinhTrang', value);
      },
    },
    {
      name: 'createdDate',
      key: 'createdDate',
      label: t('Inventory Date'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.createdDate,
      onChange: (_, dateString: string) => {
        handleChange('createdDate', dateString);
      },
    },
    {
      name: 'nguoiKiemKe',
      key: 'nguoiKiemKe',
      type: TYPE_FIELD.TEXT,
      label: t('Receipt Creator'),
      require: true,
      value: formControl.values.nguoiKiemKe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nguoiKiemKe', e.target.value);
      },
    },
    {
      name: 'tongGiaTri',
      key: 'tongGiaTri',
      type: TYPE_FIELD.TEXT,
      label: t('Total Value'),
      value: formControl.values.tongGiaTri,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tongGiaTri', e.target.value);
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
              ? t('Add_Inventory_Voucher')
              : modalType === 'edit'
                ? t('Edit_Inventory_Voucher')
                : t('View_Inventory_Voucher')}
          </Typography.Title>
        }
        footer
        width={600}
      >
        <Space direction='vertical'>
          <InputFields
            inputs={inputs}
            form={formControl}
            span={{ sm: 24, lg: 12 }}
            gutter={[0, 6]}
          ></InputFields>
          <Flex justify='end' gap={12}>
            <Button onClick={onHide}> {t('Cancel')}</Button>
            <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
              {t('Save')}
            </ButtonCustom.Edit>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default InventoryModal;
