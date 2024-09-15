import { ChangeEvent, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import {
  KHO_KIEM_KE,
  NGUON_THUOC,
  TINH_TRANG,
} from 'src/constants/dumb/inventory';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  InventoryModelType,
  TInventorySheet,
} from 'src/constants/types/medicineStore/inventorySheet';
import inventoryApi from 'src/helpers/api/medicineStore/inventory';
import { numberOnly, yupObject } from 'src/utils/validate';
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
  khoId: numberOnly,
  tenKho: Yup.string().required('Vui lòng chọn tên kho'),
  tieuDe: Yup.string()
    .required('Vui lòng nhập tiêu đề phiếu')
    .min(5, 'Quá ngắn')
    .max(20, 'Quá dài'),
  nguonThuoc: Yup.string().required('Vui lòng chọn nguồn thuốc'),
  nguonThuocId: numberOnly,
  tinhTrang: Yup.string().required('Vui lòng chọn trạng thái phiếu'),
  tongGiaTri: numberOnly,
});

const defaultValue: FormValues = {
  id: '',
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
  const isDisable = modalType === 'view';

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
      type: TYPE_FIELD.TEXT,
      //disabled: isDisable || modalType === 'edit',
      value: formControl.values.maPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maPhieu', e.target.value);
      },
    },
    {
      name: 'khoId',
      key: 'khoId',
      label: 'Kho ID',
      value: formControl.values.khoId,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('khoId', e.target.value);
      },
    },
    {
      name: 'tenKho',
      key: 'tenKho',
      label: 'Tên kho',
      type: TYPE_FIELD.SELECT,
      options: KHO_KIEM_KE,
      //disabled: isDisable || modalType === 'edit',
      value: formControl.values.tenKho,
      onChange: (value: string) => {
        handleChange('tenKho', value);
      },
    },
    {
      name: 'tieuDe',
      key: 'tieuDe',
      label: 'Tiêu đề',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.tieuDe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tieuDe', e.target.value);
      },
    },
    {
      name: 'nguonThuocId',
      key: 'nguonThuocId',
      label: 'Nguồn thuốc ID',
      type: TYPE_FIELD.TEXT,
      value: formControl.values.nguonThuocId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nguonThuocId', e.target.value);
      },
    },
    {
      name: 'nguonThuoc',
      key: 'nguonThuoc',
      label: 'Nguồn thuốc',
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
      label: 'Tình trạng phiếu',
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      value: formControl.values.tinhTrang,
      onChange: (value: string) => {
        handleChange('tinhTrang', value);
      },
    },
    {
      name: 'createdDate',
      key: 'createdDate',
      label: 'Ngày kiểm kê',
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.createdDate,
      onChange: (value: string) => {
        handleChange('createdDate', value);
      },
    },
    {
      name: 'nguoiKiemKe',
      key: 'nguoiKiemKe',
      type: TYPE_FIELD.TEXT,
      label: 'Người lập phiếu',
      value: formControl.values.nguoiKiemKe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nguoiKiemKe', e.target.value);
      },
    },
    {
      name: 'tongGiaTri',
      key: 'tongGiaTri',
      type: TYPE_FIELD.TEXT,
      label: 'Tổng giá trị',
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

export default InventoryModal;
