import { ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import {
  ProvisionalModalType,
  TProvisional,
} from 'src/constants/types/medicineStore/phieuDuTru';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import phieuDuTruApi from 'src/helpers/api/medicineStore/phieuDuTru';
import provisionalApi from 'src/helpers/api/medicineStore/phieuDuTru';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';
interface AddphieuDuTru {
  show: boolean;
  modalType: ProvisionalModalType;
  phieuDuTru: TProvisional | null;
  onHide: () => void;
  onSuccess: () => void;
}

const formSchema = yupObject({
  maPhieu: Yup.number().required().nullable(),
  tinhTrang: Yup.string().required('Vui lòng chọn tình trạng').nullable(),
  khoXuat: Yup.string().required('Vui lòng chọn kho xuất').nullable(),
  ngayNhapDen: Yup.string().required('Vui lòng chọn ngày nhập đến').nullable(),
  ngayNhapTu: Yup.string().required('Vui lòng chọn ngày nhập từ').nullable(),
  khoNhap: Yup.string().required('Vui lòng chọn kho nhập').nullable(),
  tieuDe: Yup.string().required('Vui lòng nhập tiêu đề').nullable(),
});

const defaultValue: TProvisional = {
  id: null,
  maPhieu: '',
  khoXuat: '',
  ngayNhapDen: '',
  ngayNhapTu: '',
  tinhTrang: '',
  khoNhap: '',
  tieuDe: '',
};

const ProvisionalModal = ({
  show,
  modalType,
  phieuDuTru,
  onHide,
  onSuccess,
}: AddphieuDuTru) => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const isDisable = modalType === 'edit';
  const formControl = useFormik<TProvisional>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TProvisional) => {
      try {
        if (modalType === 'edit' && phieuDuTru) {
          const res = await provisionalApi.updateProvisional(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await provisionalApi.createProvisional(data);
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
  const handleChange = (key: keyof TProvisional, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };
  useEffect(() => {
    if (modalType === 'edit' && phieuDuTru) {
      formControl.setValues(phieuDuTru);
    }
    if (modalType == 'add' && phieuDuTru) {
      //
    }
  }, [modalType, phieuDuTru]);
  const inputs: InputProps[] = [
    {
      label: 'Mã phiếu',
      name: 'maPhieu',
      key: 'maPhieu',
      value: formControl.values.maPhieu,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maPhieu', e.target.value);
      },
    },
    {
      label: 'Kho nhập',
      name: 'khoNhap',
      key: 'khoNhap',
      value: formControl.values.khoNhap,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('khoNhap', value);
      },
    },
    {
      label: 'Kho xuất',
      name: 'khoXuat',
      key: 'khoXuat',
      value: formControl.values.khoXuat,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('khoXuat', value);
      },
    },
    {
      label: 'Tình trạng',
      name: 'tinhTrang',
      key: 'tinhTrang',
      value: formControl.values.tinhTrang,
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      onChange: (value: string | null) => {
        handleChange('tinhTrang', value);
      },
    },
    {
      label: 'Ngày nhập đến',
      name: 'ngayNhapDen',
      key: 'ngayNhapDen',
      value: formControl.values.ngayNhapDen,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        handleChange('ngayNhapDen', newValue);
      },
    },
    {
      label: 'Ngày nhập từ',
      name: 'ngayNhapTu',
      key: 'ngayNhapTu',
      value: formControl.values.ngayNhapTu,
      allowClear: true,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        handleChange('ngayNhapTu', newValue);
      },
    },
    {
      label: 'Tiêu đề',
      name: 'tieuDe',
      key: 'tieuDe',
      value: formControl.values.tieuDe,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tieuDe', e.target.value);
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
            {modalType === 'view' ? 'Xem phiếu dự trù' : 'Sửa phiếu dự trù'}
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

export default ProvisionalModal;
