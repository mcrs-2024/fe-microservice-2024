import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import {
  ProvisionalModalType,
  TProvisional,
} from 'src/constants/types/medicineStore/phieuDuTru';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import provisionalApi from 'src/helpers/api/medicineStore/phieuDuTru';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';
interface AddProvisional {
  show: boolean;
  modalType: ProvisionalModalType;
  provisional: TProvisional | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TProvisional = {
  id: null,
  maPhieu: null,
  khoXuat: null,
  ngayNhapDen: null,
  ngayNhapTu: null,
  tinhTrang: null,
  khoNhap: null,
  tieuDe: null,
};

const ProvisionalModal = ({
  show,
  modalType,
  provisional,
  onHide,
  onSuccess,
}: AddProvisional) => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();

  const formSchema = yupObject({
    maPhieu: Yup.number()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_voucher_code'))
      .nullable(),
    khoXuat: Yup.string()
      .required(t('Please_select_the_outgoing_warehouse'))
      .nullable(),
    ngayNhapDen: Yup.string()
      .required(t('Please_select_the_entry_date_to'))
      .nullable(),
    ngayNhapTu: Yup.string()
      .required(t('Please_select_the_entry_date_from'))
      .nullable(),
    khoNhap: Yup.string()
      .required(t('Please_select_the_incoming_warehouse'))
      .nullable(),
    tieuDe: Yup.string().required(t('Please_enter_the_title')).nullable(),
  });

  const formControl = useFormik<TProvisional>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TProvisional) => {
      try {
        if (modalType === 'edit' && provisional) {
          const res = await provisionalApi.updateProvisional(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        }
        if (modalType === 'add' && provisional) {
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
  const handleResetForm = () => {
    formControl.resetForm();
  };
  useEffect(() => {
    if (modalType === 'edit' && provisional) {
      handleResetForm();
      formControl.setValues(provisional);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, provisional]);
  const inputs: InputProps[] = [
    {
      label: t('Voucher_Code'),
      name: 'maPhieu',
      key: 'maPhieu',
      value: formControl.values.maPhieu,
      type: TYPE_FIELD.TEXT,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maPhieu', e.target.value);
      },
    },
    {
      label: t('Incoming_Warehouse'),
      name: 'khoNhap',
      key: 'khoNhap',
      value: formControl.values.khoNhap,
      require: true,
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
      label: t('Outgoing_Warehouse'),
      name: 'khoXuat',
      key: 'khoXuat',
      value: formControl.values.khoXuat,
      require: true,
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
      label: t('Status'),
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
      label: t('Entry_Date_To'), // Translated to English: "Entry date to"
      name: 'ngayNhapDen',
      key: 'ngayNhapDen',
      value: formControl.values.ngayNhapDen,
      type: TYPE_FIELD.DATE_PICKER,
      require: true,
      allowClear: true,
      onChange: (_, dateString: string) => {
        handleChange('ngayNhapDen', dateString);
      },
    },
    {
      label: t('Entry_Date_From'), // Translated to English: "Entry date from"
      name: 'ngayNhapTu',
      key: 'ngayNhapTu',
      value: formControl.values.ngayNhapTu,
      require: true,
      allowClear: true,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (_, dateString: string) => {
        handleChange('ngayNhapTu', dateString);
      },
    },
    {
      label: t('Title'), // Translated to English: "Title"
      name: 'tieuDe',
      key: 'tieuDe',
      value: formControl.values.tieuDe,
      type: TYPE_FIELD.TEXT,
      require: true,
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
            {modalType === 'add'
              ? t('Add_Provisional')
              : modalType === 'edit'
                ? t('Edit_Provisional')
                : t('View_Provisional')}
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
