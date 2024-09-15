import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
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

const formSchema = yupObject({
  maPhieu: Yup.number()
    .min(0, 'Vui lòng nhập số dương')
    .required('Vui lòng nhập mã phiếu')
    .nullable(),
  khoId: Yup.number()
    .min(0, 'Vui lòng nhập số dương')
    .required('Vui lòng nhập mã kho')
    .nullable(),
  tenKho: Yup.string().required('Vui lòng chọn tên kho').nullable(),
  tieuDe: Yup.string()
    .required('Vui lòng nhập tiêu đề phiếu')
    .min(5, 'Quá ngắn, vui lòng nhập tối thiểu 5 ký tự')
    .max(20, 'Quá dài, vui lòng nhập tối đa 300 ký tự'),
  nguonThuoc: Yup.string().required('Vui lòng chọn nguồn thuốc').nullable(),
  nguonThuocId: Yup.number()
    .min(0, 'Vui lòng nhập số dương')
    .required('Vui lòng nhập mã nguồn thuốc')
    .nullable(),
  tinhTrang: Yup.string().required('Vui lòng chọn trạng thái phiếu').nullable(),
  tongGiaTri: Yup.number()
    .min(0, 'Vui lòng nhập số dương')
    .required('Vui lòng nhập tổng giá trị')
    .nullable(),
  createdDate: Yup.string().required('Vui lòng chọn ngày').nullable(),
  nguoiKiemKe: Yup.string().required('Vui lòng nhập người kiểm kê').nullable(),
});

const defaultValue: FormValues = {
  id: null,
  createdBy: null,
  createdDate: '',
  description: '',
  khoId: null,
  maPhieu: '',
  modifiedBy: null,
  modifiedDate: '',
  nguoiKiemKe: '',
  nguonThuoc: '',
  nguonThuocId: '',
  tieuDe: '',
  tongGiaTri: null,
  tinhTrang: '',
  tenKho: '',
  //ngayKiemKe: '',
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
      label: 'Mã phiếu',
      value: formControl.values.maPhieu,
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
          value: warehouse.tenKho ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      //disabled: isDisable || modalType === 'edit',
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
      onChange: (value: Dayjs | null) => {
        const newVale = value ? dayjs(value).format(DATE_FORMAT.DATE) : '';
        handleChange('createdDate', newVale);
      },
    },
    {
      name: 'nguoiKiemKe',
      key: 'nguoiKiemKe',
      type: TYPE_FIELD.TEXT,
      label: t('Receipt Creator'),
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
              ? 'Thêm phiếu kiểm kê'
              : modalType === 'edit'
                ? 'Sửa phiếu kiểm kê'
                : 'Xem phiếu kiểm kê'}
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
