import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, message, Modal, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import {
  DON_VI_CHINH,
  DUONG_DUNG,
  LOAI_THUOC,
} from 'src/constants/dumb/medicineCategory';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  THoatChatCategory,
  TMedicineCategory,
  TMedicineCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import { useGetAllHoatChat } from 'src/helpers/api/medicineStore/medicineStoreCategory/hoatChatCategory';
import medicineCategoryApi from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineCategory';
import { yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddMedicineCategory {
  show: boolean;
  modalType: TMedicineCategoryModal;
  data: TMedicineCategory | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TMedicineCategory = {
  id: null,
  hamLuong: '',
  hoatChatId: null,
  isStend: false,
  ten: '',
  soDangKy: '',
  bhChiTra: null,
  hoatChat: '',
  duongDung: '',
  maLoaiBhyt: '',
  maBhyt: '',
  donViChinh: '',
  loaiThuoc: '',
};

const MedicineCategoryModal = ({
  show,
  modalType,
  data,
  onHide,
  onSuccess,
}: AddMedicineCategory) => {
  const { data: activeIngredients } = useGetAllHoatChat();
  const isDisable = modalType === 'edit';
  const { t } = useTranslation();
  const formSchema = yupObject({
    // id: Yup.string().required('Vui lòng nhập hàm lượng').nullable(),
    hamLuong: Yup.string()
      .required(t('Please enter Concentration/Content'))
      .nullable(),
    hoatChatId: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please enter Active ingredient ID'))
      .nullable(),
    ten: Yup.string().required(t('Please enter Medicine name')).nullable(),
    soDangKy: Yup.string()
      .required(t('Please enter Registration number'))
      .nullable(),
    bhChiTra: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please enter Insurance payment'))
      .nullable(),
    hoatChat: Yup.string()
      .required(t('Please enter Active ingredient'))
      .nullable(),
    duongDung: Yup.string()
      .required(t('Please enter Route of medicine'))
      .nullable(),
    maLoaiBhyt: Yup.string()
      .required(t('Please enter Health insurance type code'))
      .nullable(),
    maBhyt: Yup.string()
      .required(t('Please enter Health insurance code'))
      .nullable(),
    donViChinh: Yup.string().required(t('Please enter Main unit')).nullable(),
    loaiThuoc: Yup.string()
      .required(t('Please enter medicine type'))
      .nullable(),
  });
  const formControl = useFormik<TMedicineCategory>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TMedicineCategory) => {
      console.log('data: ', data);
      try {
        if (modalType === 'edit' && data) {
          const res = await medicineCategoryApi.updateMedicine(data);
          if (res.data.message) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await medicineCategoryApi.createMedicine(data);
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

  const handleChange = (key: keyof TMedicineCategory, value: any) => {
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
      /* empty */
    }
  }, [modalType, data]);
  const input: InputProps[] = [
    {
      label: t('Medicine_name'),
      name: 'ten',
      key: 'ten',
      allowClear: true,
      value: formControl.values.ten,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('ten', e.target.value);
      },
    },
    {
      label: t('Medicine code according to health insurance'),
      name: 'maBhyt',
      key: 'maBhyt',
      allowClear: true,
      value: formControl.values.maBhyt,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maBhyt', e.target.value);
      },
    },
    {
      label: t('Medicine group code according to health insurance'),
      name: 'maLoaiBhyt',
      key: 'maLoaiBhyt',
      allowClear: true,
      value: formControl.values.maLoaiBhyt,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('maLoaiBhyt', e.target.value);
      },
    },
    {
      label: t('Registration_Number'),
      name: 'soDangKy',
      key: 'soDangKy',
      allowClear: true,
      value: formControl.values.soDangKy,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soDangKy', e.target.value);
      },
    },
    {
      label: t('Route of drug'),
      name: 'duongDung',
      key: 'duongDung',
      allowClear: true,
      value: formControl.values.duongDung,
      type: TYPE_FIELD.SELECT,
      options: DUONG_DUNG,
      onChange: (value: string | null) => {
        handleChange('duongDung', value);
      },
    },
    {
      label: t('Type_of_Medicine'),
      name: 'loaiThuoc',
      key: 'loaiThuoc',
      allowClear: true,
      value: formControl.values.loaiThuoc,
      type: TYPE_FIELD.SELECT,
      options: LOAI_THUOC,
      onChange: (value: string | null) => {
        handleChange('loaiThuoc', value);
      },
    },

    {
      label: t('Active_Ingredient_ID'),
      name: 'hoatChatId',
      key: 'hoatChatId',
      allowClear: true,
      value: formControl.values.hoatChatId,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hoatChatId', e.target.value);
      },
    },
    {
      label: t('Active_Ingredient'),
      name: 'hoatChat',
      key: 'hoatChat',
      allowClear: true,
      value: formControl.values.hoatChat,
      type: TYPE_FIELD.SELECT,
      options: activeIngredients?.data?.map(
        (activeIngredient: THoatChatCategory) => ({
          value: activeIngredient?.tenHoatChat ?? '',
          label: activeIngredient?.tenHoatChat ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        handleChange('hoatChat', value);
      },
    },
    {
      label: t('Concentration/Content'),
      name: 'hamLuong',
      key: 'hamLuong',
      allowClear: true,
      value: formControl.values.hamLuong,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hamLuong', e.target.value);
      },
    },
    {
      label: t('Main unit'),
      name: 'donViChinh',
      key: 'donViChinh',
      allowClear: true,
      value: formControl.values.donViChinh,
      type: TYPE_FIELD.SELECT,
      options: DON_VI_CHINH,
      onChange: (value: string | null) => {
        handleChange('donViChinh', value);
      },
    },

    {
      label: t('Insurance payment'),
      name: 'bhChiTra',
      key: 'bhChiTra',
      allowClear: true,
      value: formControl.values.bhChiTra,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('bhChiTra', e.target.value);
      },
    },
    {
      label: 'Stend',
      name: 'isStend',
      type: TYPE_FIELD.CHECKBOX,
      disabled: isDisable,
      value: formControl.values.isStend,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('isStend', e.target.checked);
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
              ? 'Thêm thuốc'
              : modalType === 'edit'
                ? 'Chỉnh sửa thuốc'
                : 'Xem thuốc'}
          </Typography.Title>
        }
        footer
        width={1000}
      >
        <Space direction='vertical' className='d-flex'>
          <InputFields
            inputs={input}
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
export default MedicineCategoryModal;
